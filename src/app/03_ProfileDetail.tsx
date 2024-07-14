import {useParams} from "react-router-dom";
import {useMemo} from "react";
import {PROFILES} from "../data/profiles.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {convertTStoDate, generatePDF, numberToFrenchText, TemplateData} from "../helpers/helpers.ts";
import {Button} from "../components/ui/button.tsx";

export default function ProfileDetail() {
    const {id} = useParams()

    const profile = useMemo(()=>{
        if(!id){
            return null
        }

        return PROFILES.find((profile)=>{
            return profile.lastName === id
        })

    },[id])

    const buildDataForTemplate = (profile): TemplateData => {

        const currentDate = new Date()
        const startOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime()
        const endOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getTime()
        return {
            today: convertTStoDate(currentDate.getTime()),
            title: 'Monsieur',
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            lastName: profile?.lastName,
            firstName: profile?.firstName,
            email: profile?.email,
            startDate: convertTStoDate(profile?.startDate),
            rent: profile?.rent,
            charge: profile?.charge,
            totalRent: profile?.rent + profile?.charge,
            totalRentInText: numberToFrenchText(profile?.rent + profile?.charge),
            dateOfPayment: convertTStoDate(currentDate.getTime()),
            startPeriod: convertTStoDate(startOfThisMonth),
            endPeriod: convertTStoDate(endOfThisMonth)
        }
    }

    const downloadReceipt = () => {
            const data= buildDataForTemplate(profile)

          generatePDF('../assets/receipt.html', data, 'receipt.pdf')

    }




    return(<div className='text-center m-10'>
        <h1 className='text-3xl mb-5'>DETAIL</h1>
        <Card className='text-left'>
            <CardHeader>
                <CardTitle>{profile?.lastName} {profile?.firstName} </CardTitle>
                <CardDescription>Start date : {convertTStoDate(profile?.startDate)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Contact: {profile?.email}</p>
                <p>Rent : {profile?.rent}</p>
                <p>Charge: {profile?.charge}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={downloadReceipt}>Download Receipts</Button>
            </CardFooter>
        </Card>
    </div>)
}