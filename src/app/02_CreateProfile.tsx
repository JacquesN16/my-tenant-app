import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../components/ui/form"

import { Calendar } from "../components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"

import { Input } from "../components/ui/input"
import {cn} from "../components/lib/utils.ts";
import {toast} from "../components/ui/use-toast.ts";

const formSchema = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        startDate: z.date().optional(),
        rent: z.number().positive(),
        charge: z.number().positive(),

})



type FormValues = z.infer<typeof formSchema>
export default function CreateProfile () {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName:"",
            startDate: new Date(),
            rent:0,
            charge:0,
        },
        mode: "onChange",
    })



    function onSubmit(values: FormValues) {

        console.log('click',values)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            ),
        })
    }



    return (
        <>
            <h1 className='text-center font-bold scale-95'>Create a new profile</h1>
            <div className='w-2/3 mx-auto'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder={field.value}/>
                                        </FormControl>
                                    </FormItem>
                                </>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input placeholder={field.value} />
                                        </FormControl>
                                    </FormItem>
                                </>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field}) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Start Date </FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "dd-MM-yyyy") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>

                                    </FormItem>
                                </>

                            )}
                        />

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="rent"*/}
                        {/*    render={({ field }) => (*/}
                        {/*        <>*/}
                        {/*            <FormItem>*/}
                        {/*                <FormLabel>Rent</FormLabel>*/}
                        {/*                <FormControl>*/}
                        {/*                    <Input type="number" placeholder={field.value + '€'} {...field} />*/}
                        {/*                </FormControl>*/}
                        {/*            </FormItem>*/}
                        {/*        </>*/}

                        {/*    )}*/}
                        {/*/>*/}
                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="charge"*/}
                        {/*    render={({ field }) => (*/}
                        {/*        <>*/}
                        {/*            <FormItem>*/}
                        {/*                <FormLabel>Monthly Charge</FormLabel>*/}
                        {/*                <FormControl>*/}
                        {/*                    <Input type="number" placeholder={field.value + '€'} {...field} />*/}
                        {/*                </FormControl>*/}
                        {/*            </FormItem>*/}
                        {/*        </>*/}

                        {/*    )}*/}
                        {/*/>*/}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

