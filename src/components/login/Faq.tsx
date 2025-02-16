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
      <h1 className="text-center text-3xl font-bold underline underline-offset-4 mb-5">
        FAQ
      </h1>
      <Accordion type="single" collapsible className="w-[80%] mx-auto">
        {faqData.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-lg font-semibold">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-lg">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
