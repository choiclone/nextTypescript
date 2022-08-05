import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { loadCheckout } from '../lib/stripe';
import Loader from './Loader';
import Table from './Table';

interface Props {
    products: string[];
};

function Plans({ products }: Props) {
    const { logout, user } = useAuth();
    const [selectPlan, setSelectPlan] = useState<string | null>("Standard");
    const [isBillingLoading, setBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if (!user) return

        loadCheckout(selectPlan)

        setBillingLoading(true)
    }

    return (
        <div>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="border-b border-white/10 bg-[#141414]">
                <Link href="/">
                    <img src="https://rb.gy/ulxxee" alt="Netflix" width={150} height={90} className="cursor-pointer object-contain" />
                </Link>
                <button className='text-lg font-medium hover:underline' onClick={logout}>
                    Sign Out
                </button>
            </header>

            <main className='mx-auto px-5 max-w-5xl pt-28 pb-12 transition-all md:px-10'>
                <h1 className='mb-3 text-3xl font-medium'>Choose the plan that's right for you</h1>
                <ul>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon className='h-7 w-7 text-[#E50914]' />
                        Watch all you want.
                        Ad-free.
                    </li>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon className='h-7 w-7 text-[#E50914]' />
                        Recommendations
                        just for you.
                    </li>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon className='h-7 w-7 text-[#E50914]' />
                        Change or cancel your plan anytime.
                    </li>
                </ul>

                <div className='mt-4 flex flex-col space-y-4'>
                    <div className='flex w-full items-center justify-end self-end md:w-3/5'>
                        <div className={`planBox ${selectPlan === "Basic" ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectPlan("Basic")}>
                            Basic
                        </div>
                        <div className={`planBox ${selectPlan === "Standard" ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectPlan("Standard")}>
                            Standard
                        </div>
                        <div className={`planBox ${selectPlan === "Premium" ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectPlan("Premium")}>
                            Premium
                        </div>
                    </div>
                    <Table products={products} selectPlan={selectPlan} />
                    <button
                        disabled={!selectPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                            }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-gray-300" />
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Plans