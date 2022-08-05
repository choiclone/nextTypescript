// import { Product } from '@stripe/firestore-stripe-payments';

import { CheckIcon } from "@heroicons/react/solid"

interface Props {
    products: string[],
    selectPlan: string | null
    // products: Product[],
    // selectPlan: Product,
}

function Table({products, selectPlan}:Props) {
  return (
    <table>
        <tbody className="divide-y divide-[gray]">
            <tr className="tableRow">
                <td className="tableDataTitle">Monthy price</td>
                <td className={`tableDataFeature`}>AED29</td>
                <td className={`tableDataFeature`}>AED39</td>
                <td className={`tableDataFeature`}>AED56</td>
            </tr>
            <tr className="tableRow">
                <td className="tableDataTitle">Video quality</td>
                <td className={`tableDataFeature`}>Good</td>
                <td className={`tableDataFeature`}>Better</td>
                <td className={`tableDataFeature`}>Best</td>
            </tr>
            <tr className="tableRow">
                <td className="tableDataTitle">Resolution</td>
                <td className={`tableDataFeature`}>480p</td>
                <td className={`tableDataFeature`}>1080p</td>
                <td className={`tableDataFeature`}>4K+HDR</td>
            </tr>
            <tr className="tableRow">
                <td className="tableDataTitle">Watch on Your TV, computer, mobile phone and tablet</td>
                <td className={`tableDataFeature`}><CheckIcon className="inline-block h-8 w-8" /></td>
                <td className={`tableDataFeature`}><CheckIcon className="inline-block h-8 w-8" /></td>
                <td className={`tableDataFeature`}><CheckIcon className="inline-block h-8 w-8" /></td>
            </tr>
        </tbody>
    </table>
  )
}

export default Table