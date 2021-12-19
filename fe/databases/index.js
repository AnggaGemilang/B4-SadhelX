import Realm from 'realm'
export const MEMBER_SCHEMA = "Member"

export const MemberSchema = {
    name: MEMBER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        username : { type: 'string', indexed: true },
        firstname : { type: 'string', indexed: true },
        lastname : { type: 'string', indexed: true },
        image_file : { type: 'string', indexed: true },
        created_at : { type: 'date', indexed: true}
    }
}

const databaseOptions = {
    path: 'recentsearch.realm',
    schema: [MemberSchema]
}

export const insertNewRecent = newRecent => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let data = realm.objectForPrimaryKey(MEMBER_SCHEMA, newRecent.id);
        if (data != null) {
            realm.write(() => {
                let updatingItem = realm.objectForPrimaryKey(MEMBER_SCHEMA, newRecent.id);   
                updatingItem.created_at = newRecent.updatingItem;    
                resolve();     
            });
        } else {
            realm.write(() => {
                realm.create(MEMBER_SCHEMA, newRecent)
                resolve(newRecent)
            })
        }
    }).catch((error) => reject(error));
})

export const deleteRecentData = recentId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingRecent = realm.objectForPrimaryKey(MEMBER_SCHEMA, recentId)
            realm.delete(deletingRecent)
            resolve()
        })
    }).catch((error) => reject(error));
})

export const queryRecentLists = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allRecentLists = realm.objects(MEMBER_SCHEMA)
        resolve(allRecentLists)
    }).catch((error) => {
        reject(error)
    })
})

export default new Realm(databaseOptions)