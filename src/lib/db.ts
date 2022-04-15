import { browser } from '$app/env';

export async function getRecords(collectionName: string, parentId: string, documentId: string) {
	if (browser) {
		const onlineStat = navigator.onLine;
		let data = [];
		const { app } = await import('./app');
		const {
			getFirestore,
			collectionGroup,
			getDocs,
			doc,
			getDoc,
			getDocFromCache,
			getDocsFromCache,
			enableIndexedDbPersistence
		} = await import('firebase/firestore');
		const db = getFirestore(app);

		// Offline access
		// This is a little bit tricky since the firebase call returns a promise which does not resolve any data
		const offData = localStorage.getItem('offData');
		if (!offData) {
			enableIndexedDbPersistence(db);
			localStorage.setItem('offData', 'a');
		}
		if (parentId) {
			let singleDoc;
			if (onlineStat) {
				singleDoc = await getDoc(doc(db, 'guide', parentId, 'session', documentId));
			} else {
				singleDoc = await getDocFromCache(doc(db, 'guide', parentId, 'session', documentId));
			}

			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			if (singleDoc.exists()) {
				return singleDoc.data();
			} else {
				console.log('It doesnt');
			}
		} else {
			let col;
			if (onlineStat) {
				col = await getDocs(collectionGroup(db, collectionName));
			} else {
				col = await getDocsFromCache(collectionGroup(db, collectionName));
			}
			col.forEach((doc) => {
				let docItem;
				const docRef = doc.ref;
				const parentCollectionRef = docRef.parent; // CollectionReference
				const immediateParentDocumentRef = parentCollectionRef.parent; // DocumentReference
				docItem = {
					...doc.data(),
					...{ sessionId: doc.id },
					...{ guideId: immediateParentDocumentRef.id }
				};
				data = [...data, docItem];
			});
		}
		// data = [...data, doc.data()]
		return Promise.resolve(data);
	}
}
