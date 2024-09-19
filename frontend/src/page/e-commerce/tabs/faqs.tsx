import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        id: "item-1",
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy. If you are not satisfied with your purchase, you can return it within 30 days for a full refund, provided the item is in its original condition."
    },
    {
        id: "item-2",
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 5-7 business days. Expedited shipping options are also available at checkout for faster delivery."
    },
    {
        id: "item-3",
        question: "Do you ship internationally?",
        answer: "Yes, we offer international shipping to most countries. Shipping fees and delivery times may vary depending on your location."
    },
    {
        id: "item-4",
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking number. You can use this number to track your package on our website or the carrier's website."
    },
    {
        id: "item-5",
        question: "Can I cancel or modify my order?",
        answer: "You can cancel or modify your order within 24 hours of placing it. After this time, the order will be processed, and changes may no longer be possible."
    },
    {
        id: "item-6",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and Apple Pay. Other payment options may also be available depending on your region."
    },
    {
        id: "item-7",
        question: "Is there a warranty on your products?",
        answer: "Yes, we offer a 1-year limited warranty on most of our products. Please check the product page for specific warranty information."
    },
    {
        id: "item-8",
        question: "Do you offer gift wrapping?",
        answer: "Yes, we offer gift wrapping options at checkout. You can choose to add a personalized message with the wrapped gift."
    },
    {
        id: "item-9",
        question: "What if I receive a defective item?",
        answer: "If you receive a defective item, please contact our support team within 7 days of receiving the product. We will arrange for a replacement or refund."
    },
    {
        id: "item-10",
        question: "Can I change my shipping address after placing an order?",
        answer: "You can update your shipping address within 24 hours of placing the order by contacting our support team."
    },
];

export default function Faqs() {
    return (
        <Accordion type="multiple" className="w-full mt-6">
            {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-lg font-semibold">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}