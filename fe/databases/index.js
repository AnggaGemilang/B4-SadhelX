import Realm from 'realm'
export const MEMBER_SCHEMA = "Member"

export const MemberSchema = {
    name: MEMBER_SCHEMA,
    primary_key: 'id',
    properties: {
        id: 'int',
        username : { type: 'string', indexed: true },
        firstname : { type: 'string', indexed: true },
        lastname : { type: 'string', indexed: true },
        avatar : { type: 'string', indexed: true }
    }
}

const databaseOptions = {
    path: 'recentsearch.realm',
    schema: MemberSchema
}

export const insertNewRecent = newRecent => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(MemberSchema, newRecent)
            resolve(newRecent)
        })
    }).catch((error) => reject(error));
})

export const deleteNewRecent = recentId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingRecent = realm.objectForPrimaryKey(MEMBER_SCHEMA, recentId)
            realm.delete(deletingRecent)
            resolve()
        })
    }).catch((error) => reject(error));
})

export default new Realm(databaseOptions)