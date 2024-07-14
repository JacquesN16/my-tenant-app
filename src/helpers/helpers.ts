import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface TemplateData {
    title: string | null
    month: number | null
    year: number | null
    lastName: string | null
    firstName: string | null
    email: string | null
    startDate: string | null
    rent: number | null
    charge: number | null
    totalRent: number | null
    totalRentInText: string | null
    dateOfPayment: string | null
    today: string | null
    startPeriod: string | null
    endPeriod: string | null
}
export const generatePDF = async (
    templatePath: string,
    data: TemplateData,
    filename: string
): Promise<void> => {
    const response = await fetch(templatePath);
    if (!response.ok) {
        console.error('Failed to fetch template:', response.statusText);
        return;
    }

    const htmlString = await response.text();
    const template = document.createElement('div');
    template.innerHTML = htmlString;
    template.style.width = '640'
    template.style.height = '590'
    // Replace placeholders with actual data
    Object.entries(data).forEach(([key, value]) => {
        const elements = template.getElementsByClassName(`${key}`);
        for(let i = 0; i < elements.length; i++){
            elements[i].textContent = value.toString();
        }
    });
    await generatePDFDoc(template,filename); // No image, proceed directly

};

export const generatePDFDoc = async (template: HTMLDivElement, filename:string): Promise<void> => {
        document.body.appendChild(template)
        const canvas = await html2canvas(template, { scale:2 }); // Adjust scale as needed
        const imgData = canvas.toDataURL('image/png');

        // template.remove()
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'cm',
            format: 'a4'
        });
        const WIDTH = 21;
        const HEIGHT = 22;
        pdf.addImage(imgData, 'PNG', 0, 0, WIDTH, HEIGHT);
        pdf.save(filename);
};

export function convertTStoDate(ts?: number): string{
    if(!ts) return ""
    const date = new Date(ts);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString("fr-FR", options);
}

export function numberToFrenchText(number: number) {
    // Check for invalid input
    if (isNaN(number) || number < 0 || number > 999) {
        return "";
    }

    // Array of words for numbers 0-19
    const ones = [
        "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
        "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"
    ];

    // Array of words for tens (20-90)
    const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

    // Array of words for hundreds
    const hundreds = ["", "cent", "deux cents", "trois cents", "quatre cents", "cinq cents", "six cents", "sept cents", "huit cents", "neuf cents"];

    // Separate the number into hundreds, tens, and ones
    const hundredsDigit = Math.floor(number / 100);
    const tensDigit = Math.floor((number % 100) / 10);
    const onesDigit = number % 10;

    // Build the text representation
    let text = "";
    if (hundredsDigit > 0) {
        text += hundreds[hundredsDigit] + " ";
    }

    if (tensDigit > 0) {
        if (tensDigit === 1 && onesDigit > 0) {
            // Special case for eleven to nineteen
            text += ones[tensDigit * 10 + onesDigit] + " ";
        } else {
            text += tens[tensDigit] + (onesDigit > 0 ? "-" : " ");
        }
    }

    if (onesDigit > 0 && (tensDigit !== 1)) {
        text += ones[onesDigit];
    }

    return text.trim() + " euros";
}

export function attachLastNameToMailBody(lastName: string, body_template: string): string {
    return body_template.replace('****', lastName);
}
