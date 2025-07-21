import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { faqData } from "./data";

const Faq = () => {
  return (
    <div
      className="w-11/12 m-4 font-poppins sm:p-6 max-sm:pt-4 mx-auto rounded-3xl border border-black"
    >
      <h1 className="text-center text-3xl font-bold underline underline-offset-4 mb-5 text-black">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-[88%] md:w-[80%] mx-auto">
        {faqData.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-lg text-black font-semibold">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium text-black">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
