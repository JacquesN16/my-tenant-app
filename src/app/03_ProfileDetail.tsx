import {useParams} from "react-router-dom";
import {useMemo} from "react";
import {PROFILES} from "../data/profiles.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {
    attachLastNameToMailBody,
    convertTStoDate,
    generatePDF,
    numberToFrenchText,
    TemplateData
} from "../helpers/helpers.ts";
import {Button} from "../components/ui/button.tsx";
import Profile from "../model/Profile.tsx";
import {MAIL_BODY_TEMPLATE} from "../helpers/constants.ts";

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

    const buildDataForTemplate = (profile: Profile): TemplateData => {

        const currentDate = new Date()
        const startOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime()
        const endOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getTime()
        return {
            today: convertTStoDate(currentDate.getTime()),
            title: 'Monsieur',
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            lastName: profile?.lastName || "",
            firstName: profile?.firstName || "",
            email: profile?.email || "",
            startDate: convertTStoDate(profile?.startDate),
            rent: profile?.rent || 0,
            charge: profile?.charge || 0,
            totalRent: profile?.rent + profile?.charge,
            totalRentInText: numberToFrenchText(profile?.rent + profile?.charge),
            dateOfPayment: convertTStoDate(currentDate.getTime()),
            startPeriod: convertTStoDate(startOfThisMonth),
            endPeriod: convertTStoDate(endOfThisMonth)
        }
    }
    const downloadReceipt = () => {
        if(!profile) {
            return
        }
        const data= buildDataForTemplate(profile)
        generatePDF('../assets/receipt.html', data, 'receipt.pdf')
    }

    const sendEmail = () => {
        const formatter = new Intl.DateTimeFormat('fr', { month: 'long' });
        const month = formatter.format(new Date());
        const year = new Date().getFullYear()

        const mail_body = attachLastNameToMailBody(profile?.lastName ?? "", MAIL_BODY_TEMPLATE)

        window.open(`mailto:${profile?.email}?subject=Quittance de loyer ${month} ${year}&body=${mail_body}`, '_blank')
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
            <CardFooter className='flex gap-1'>
                <Button onClick={downloadReceipt}>Download Receipts</Button>
                <Button disabled={true} onClick={sendEmail}>Send Receipt</Button>
            </CardFooter>
        </Card>
    </div>)
}