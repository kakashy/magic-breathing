<script>
	import './hero-carousel.css';
	import { sessionItems } from '$lib/stores';
	import { fly, scale } from 'svelte/transition';
	function createCarousel(node) {
		// const cardsContainer = document.querySelector('.card-carousel');
		const cardsContainer = node.parentElement;
		const cardsController = document.querySelector('.card-carousel + .card-controller');

		class DraggingEvent {
			constructor(target = undefined) {
				this.target = target;
			}

			event(callback) {
				let handler;

				this.target.addEventListener('mousedown', (e) => {
					e.preventDefault();

					handler = callback(e);

					window.addEventListener('mousemove', handler);

					document.addEventListener('mouseleave', clearDraggingEvent);

					window.addEventListener('mouseup', clearDraggingEvent);

					function clearDraggingEvent() {
						window.removeEventListener('mousemove', handler);
						window.removeEventListener('mouseup', clearDraggingEvent);

						document.removeEventListener('mouseleave', clearDraggingEvent);

						handler(null);
					}
				});

				this.target.addEventListener('touchstart', (e) => {
					handler = callback(e);

					window.addEventListener('touchmove', handler);

					window.addEventListener('touchend', clearDraggingEvent);

					document.body.addEventListener('mouseleave', clearDraggingEvent);

					function clearDraggingEvent() {
						window.removeEventListener('touchmove', handler);
						window.removeEventListener('touchend', clearDraggingEvent);

						handler(null);
					}
				});
			}

			// Get the distance that the user has dragged
			getDistance(callback) {
				function distanceInit(e1) {
					let startingX, startingY;

					if ('touches' in e1) {
						startingX = e1.touches[0].clientX;
						startingY = e1.touches[0].clientY;
					} else {
						startingX = e1.clientX;
						startingY = e1.clientY;
					}

					return function (e2) {
						if (e2 === null) {
							return callback(null);
						} else {
							if ('touches' in e2) {
								return callback({
									x: e2.touches[0].clientX - startingX,
									y: e2.touches[0].clientY - startingY
								});
							} else {
								return callback({
									x: e2.clientX - startingX,
									y: e2.clientY - startingY
								});
							}
						}
					};
				}

				this.event(distanceInit);
			}
		}

		class CardCarousel extends DraggingEvent {
			constructor(container, controller = undefined) {
				super(container);

				// DOM elements
				this.container = container;
				this.controllerElement = controller;
				this.cards = container.querySelectorAll('.card');

				// Carousel data
				this.centerIndex = (this.cards.length - 1) / 2;
				this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
				this.xScale = {};

				// Resizing
				window.addEventListener('resize', this.updateCardWidth.bind(this));

				if (this.controllerElement) {
					this.controllerElement.addEventListener('keydown', this.controller.bind(this));
				}

				// Initializers
				this.build();

				// Bind dragging event
				super.getDistance(this.moveCards.bind(this));
			}

			updateCardWidth() {
				this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

				this.build();
			}

			build(fix = 0) {
				for (let i = 0; i < this.cards.length; i++) {
					const x = i - this.centerIndex;
					const scale = this.calcScale(x);
					const scale2 = this.calcScale2(x);
					const zIndex = -Math.abs(i - this.centerIndex);

					const leftPos = this.calcPos(x, scale2);

					this.xScale[x] = this.cards[i];

					this.updateCards(this.cards[i], {
						x: x,
						scale: scale,
						leftPos: leftPos,
						zIndex: zIndex
					});
				}
			}

			controller(e) {
				const temp = { ...this.xScale };

				if (e.keyCode === 39) {
					// Left arrow
					for (let x in this.xScale) {
						const newX = parseInt(x) - 1 < -this.centerIndex ? this.centerIndex : parseInt(x) - 1;

						temp[newX] = this.xScale[x];
					}
				}

				if (e.keyCode == 37) {
					// Right arrow
					for (let x in this.xScale) {
						const newX = parseInt(x) + 1 > this.centerIndex ? -this.centerIndex : parseInt(x) + 1;

						temp[newX] = this.xScale[x];
					}
				}

				this.xScale = temp;

				for (let x in temp) {
					const scale = this.calcScale(x),
						scale2 = this.calcScale2(x),
						leftPos = this.calcPos(x, scale2),
						zIndex = -Math.abs(x);

					this.updateCards(this.xScale[x], {
						x: x,
						scale: scale,
						leftPos: leftPos,
						zIndex: zIndex
					});
				}
			}

			calcPos(x, scale) {
				let formula;

				if (x < 0) {
					formula = (scale * 100 - this.cardWidth) / 2;

					return formula;
				} else if (x > 0) {
					formula = 100 - (scale * 100 + this.cardWidth) / 2;

					return formula;
				} else {
					formula = 100 - (scale * 100 + this.cardWidth) / 2;

					return formula;
				}
			}

			updateCards(card, data) {
				if (data.x || data.x == 0) {
					card.setAttribute('data-x', data.x);
					// card.style.opacity = data.x;
				}
				if (data.scale || data.scale == 0) {
					card.style.transform = `scale(${data.scale})`;

					if (data.scale == 0) {
						card.style.opacity = data.scale;
					} else if (data.scale == 1) {
						card.style.opacity = 1;
						// this is the top card, I can use its id as index
						sessionIndex = card.getAttribute('id');
					} else {
						card.style.opacity = '0.7';
					}
				}

				if (data.leftPos) {
					card.style.left = `${data.leftPos}%`;
				}

				if (data.zIndex || data.zIndex == 0) {
					if (data.zIndex == 0) {
						card.classList.add('highlight');
					} else {
						card.style.opacity = 0.1;
					}

					card.style.zIndex = data.zIndex;
				}
			}

			calcScale2(x) {
				let formula;

				if (x <= 0) {
					formula = 1 - (-1 / 5) * x;

					return formula;
				} else if (x > 0) {
					formula = 1 - (1 / 5) * x;

					return formula;
				}
			}

			calcScale(x) {
				const formula = 1 - (1 / 5) * Math.pow(x, 2);

				if (formula <= 0) {
					return 0;
				} else {
					return formula;
				}
			}

			checkOrdering(card, x, xDist) {
				const original = parseInt(card.dataset.x);
				const rounded = Math.round(xDist);
				let newX = x;

				if (x !== x + rounded) {
					if (x + rounded > original) {
						if (x + rounded > this.centerIndex) {
							newX = x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
							card.lastElementChild.style.display = 'block';
						}
					} else if (x + rounded < original) {
						if (x + rounded < -this.centerIndex) {
							newX = x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
							card.lastElementChild.style.display = 'none';
						}
					}

					this.xScale[newX + rounded] = card;
				}

				const temp = -Math.abs(newX + rounded);

				this.updateCards(card, { zIndex: temp });

				return newX;
			}

			moveCards(data) {
				let xDist;

				if (data != null) {
					this.container.classList.remove('smooth-return');
					xDist = data.x / 250;
				} else {
					this.container.classList.add('smooth-return');
					xDist = 0;

					for (let x in this.xScale) {
						this.updateCards(this.xScale[x], {
							x: x,
							zIndex: Math.abs(Math.abs(x) - this.centerIndex)
						});
					}
				}

				for (let i = 0; i < this.cards.length; i++) {
					const x = this.checkOrdering(this.cards[i], parseInt(this.cards[i].dataset.x), xDist),
						scale = this.calcScale(x + xDist),
						scale2 = this.calcScale2(x + xDist),
						leftPos = this.calcPos(x + xDist, scale2);

					this.updateCards(this.cards[i], {
						scale: scale,
						leftPos: leftPos
					});
				}
			}
		}

		const carousel = new CardCarousel(cardsContainer);
	}
	function getUrl(difficulty) {
		let difficultyUrl;

		switch (difficulty) {
			case 'easy':
				difficultyUrl = '/media/icons/network-easy.svg';
				break;
			case 'mid':
				difficultyUrl = '/media/icons/network-mid.svg';
				break;
			case 'hard':
				difficultyUrl = '/media/icons/network-hard.svg';
				break;
			default:
				difficultyUrl = '/media/icons/network.svg';
				break;
		}
		return difficultyUrl;
	}
	$: sessionIndex = undefined;
</script>

{#await $sessionItems}
	<blockquote>Seiving for those amazing sessions</blockquote>
{:then sessions}
	<section>
		<div class="container">
			<div class="card-carousel">
				{#each sessions as session}
					<div class="card" id={sessions.indexOf(session)} use:createCarousel>
						<div class="image" />
						<!-- <div class="action">
						<p class="creator">{session.guide}</p>
						<h1>{session.title}</h1>
						<div class="meta">
							<p class="rating">{session.rating} 🌟</p>
							<p class="cat">Relaxation</p>
						</div>
						<div class="btns">
							<a href={`/session/${session.guideId}/${session.sessionId}`}>
								<button class="start"> Start Session </button>
							</a>
							<a href={`/staging/${session.guideId}/${session.sessionId}`}> Learn More </a>
						</div>
					</div> -->
					</div>
				{/each}
			</div>
			<a href="/" class="visuallyhidden card-controller">Carousel controller</a>
		</div>
		{#key sessionIndex}
			{#if sessionIndex}
				<div class="action">
					<div class="content">
						<p class="creator">{sessions[sessionIndex]?.guide}</p>
						<h1>{sessions[sessionIndex]?.title}</h1>
						<div class="meta">
							<p class="rating">{sessions[sessionIndex]?.rating} 🌟</p>
							<p>{sessions[sessionIndex]?.difficulty}</p>
							<img
								src={getUrl(sessions[sessionIndex]?.difficulty)}
								width="20px"
								height="20px"
								alt=""
							/>
							<p class="cat">Relaxation</p>
						</div>
						<div class="btns">
							<a
								href={`/session/${sessions[sessionIndex]?.guideId}/${sessions[sessionIndex]?.sessionId}`}
							>
								<button class="start"> Start Session </button>
							</a>
							<a
								href={`/staging/${sessions[sessionIndex]?.guideId}/${sessions[sessionIndex]?.sessionId}`}
							>
								Learn More
							</a>
						</div>
					</div>
					<a
						class="session-link"
						href={`/session/${sessions[sessionIndex]?.guideId}/${sessions[sessionIndex]?.sessionId}`}
					>
						<button class="next"> &rightarrow </button>
					</a>
				</div>
			{/if}
		{/key}
	</section>
{/await}

<style>
	section {
		display: grid;
		place-items: center;
		place-content: center;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
	.action {
		padding: 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		z-index: 20;
		height: 150px;
		max-height: 150px;
		width: 100%;
		overflow: hidden;
	}
	.creator {
		font-size: 0.8rem;
	}
	.action h1 {
		margin: 0;
	}
	.meta {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		text-transform: capitalize;
	}
	.meta .cat {
		opacity: 0.4;
	}
	.btns {
		display: none;
		flex-direction: row;
		align-items: center;
	}
	.start {
		padding: 8px 35px;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: start;
		transition: 0.4s ease-in-out;
		font-weight: bold;
	}
	.content h1 {
		font-size: 1.8rem;
	}
	.next {
		font-size: 2rem;
		background: transparent;
		color: var(--col);
		border-radius: 50%;
	}
	.next:hover {
		background: black;
		color: var(--accent);
	}
	@media screen and (min-width: 650px) {
		.action {
			margin-left: 10%;
		}
		.btns {
			display: flex;
		}
		.session-link {
			display: none;
		}
	}
</style>
