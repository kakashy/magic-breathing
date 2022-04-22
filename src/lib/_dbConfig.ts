export const envDB = {
	inview: import.meta.env.DEV
		? 'http://localhost:5555/inview'
		: 'https://e6b140c8-fa3f-4bf4-854a-ce9d2befab62-bluemix.cloudant.com/inview'
};
