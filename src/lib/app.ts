import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBYOcAqta1gkuf98qIjfxe0Alu5whTlfKk',
	authDomain: 'inview-app.firebaseapp.com',
	projectId: 'inview-app',
	storageBucket: 'inview-app.appspot.com',
	messagingSenderId: '786513222701',
	appId: '1:786513222701:web:2e52d0ca0bee589f276ca4'
};

export const app = initializeApp(firebaseConfig);
