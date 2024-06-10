import {Inter,Roboto_Mono, Lusitana} from "next/font/google"

export const inter = Inter({subsets:['latin']})

// export const lusitana = Lusitana({subsets:['latin'], weight:['400','700']})
// export const lusitana = Lusitana({subsets:['latin'], weight:['700','400']})
export const lusitana = Lusitana({subsets:['latin'], weight:'400'})
// export const lusitana = Lusitana({subsets:['latin'], weight:'700'})

export const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
})