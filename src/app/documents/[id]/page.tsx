import {db} from '../../db'
import { notFound } from 'next/navigation';

interface DocumentShowPageProps{
    params:{
        id: string
    }
}
export default async function DocumentShowPage(props:any){
    const document = await db.documents.findFirst({
        where:{id: parseInt(props.params.id)}
    });
if(!document){
    return notFound();
}



    return <div>{document.Docs}</div>;
}