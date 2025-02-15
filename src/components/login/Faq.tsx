import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { faqData } from "./data";

const Faq = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold underline underline-offset-4">
        FAQ
      </h1>
      <Accordion type="single" collapsible className="w-[80%] mx-auto">
        {faqData.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-lg">{question}</AccordionTrigger>
            <AccordionContent className="text-lg">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
