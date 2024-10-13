import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        let ref = projectFirestore.collection(collection).doc(id)
        
        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null) // Reset back to null
            }
            else {
                setError("Could not fetch the document")
            }
        }, (error) => {
            console.log(error.message)
            setError("Could not fetch the document")
        })

        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}
