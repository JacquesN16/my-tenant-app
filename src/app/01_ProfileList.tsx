import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../components/ui/table.tsx"
import {Button} from "../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {fetchProfileList} from "./api.ts";
import {useEffect, useState} from "react";
import {PROFILES} from "../data/profiles.ts";
import {convertTStoDate} from "../helpers/helpers.ts";


export default function ProfileList() {
    const navigate = useNavigate();


    function recomputeTotalRentMonth(startDate: number) {

        const today = new Date();
        const start = new Date(startDate);
        const diff = today.getTime() - start.getTime();
        return ~~(diff / (1000 * 60 * 60 * 24 * 30));

    }



    function goToProfile(id: string) {
        navigate(`/profile/${id}`)
    }

    return (<div>
        <h1 className='text-center font-bold scale-95'>Profiles</h1>
        <div className='flex justify-center'>
            <Button onClick={() => navigate('/profile/new')}>Add new profile</Button>
        </div>
        <Table className='w-2/3 mx-auto'>
            <TableHeader>
                <TableRow>
                    <TableHead> # </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Start date</TableHead>
                    <TableHead className="text-right">Rent</TableHead>
                    <TableHead className="text-right">Charge</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Months</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {PROFILES.map((profile, index: number) => (
                    <TableRow key={profile.firstName}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{profile.firstName + " " + profile.lastName}</TableCell>
                        <TableCell>{convertTStoDate(profile.startDate)}</TableCell>
                        <TableCell className="text-right">{profile.rent}</TableCell>
                        <TableCell className="text-right">{profile.charge}</TableCell>
                        <TableCell className="text-right">{profile.rent + profile.charge}</TableCell>
                        <TableCell className="text-right">{recomputeTotalRentMonth(profile.startDate)}</TableCell>
                        <TableCell>
                            <Button onClick={() => goToProfile(profile.lastName)}>View</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>)
}