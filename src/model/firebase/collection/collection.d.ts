declare module 'model.firebase.collection' {
    type MessageInfo = { id: string; text: string; createdAt: number; createdBy: string };

    enum CollectionID {
        ttweet = 'ttweet',
    }
}
