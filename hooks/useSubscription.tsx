import { Subscription } from "@stripe/firestore-stripe-payments"
import { User } from "firebase/auth";
import { useEffect, useState } from "react"

function useSubscription(user: User | null) {
    const [subscription, setSubScription] = useState<boolean | null>(null);

    useEffect(() => {
        if(!user) return;
        setSubScription(true);
    }, [user]);

    return (
        subscription
    )
}

export default useSubscription