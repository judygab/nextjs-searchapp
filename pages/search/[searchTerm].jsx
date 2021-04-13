import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Search (){
    const router = useRouter()
    return(
        <>
            <Head>
                <title>Search</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <h1>Search results for: {router.query.searchTerm}</h1>
        </>
    )
}
