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
      className="w-3/4 m-4 font-poppins p-6 mx-auto rounded-3xl"
      style={{
        background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)",
      }}
    >
      <h1 className="text-center text-3xl font-bold underline underline-offset-4 mb-5 text-white">
        FAQ
      </h1>
      <Accordion type="single" collapsible className="w-[80%] mx-auto">
        {faqData.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-lg text-gray-200 font-semibold">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium text-white">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
