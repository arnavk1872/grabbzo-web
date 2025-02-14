import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";

const Faq = () => {
  return (
    <>
      {" "}
      <h1 className="text-center font-semibold">FAQ</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How do I register my restaurant on Grabbzo?
          </AccordionTrigger>
          <AccordionContent>
            We’ll guide you through an easy sign-up process where you’ll need to
            provide restaurant details, menu, pricing, and other necessary info.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            What are the costs involved in joining Grabbzo?
          </AccordionTrigger>
          <AccordionContent>
            Grabbzo charges a small subscription fee.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            How do I manage orders through the app?
          </AccordionTrigger>
          <AccordionContent>
            Our restaurant app has a user-friendly interface that allows you to
            accept, reject, and track orders in real time. You can also manage
            your menu and pricing.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Can I update my menu and prices on Grabbzo?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can easily update your menu items, prices, and availability
            directly through the app.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            How do I manage customer orders for takeaway, pre-dine-in, and car
            delivery?
          </AccordionTrigger>
          <AccordionContent>
            You’ll be able to select specific order types (takeaway,
            pre-dine-in, or car delivery) and manage them individually based on
            your preferences.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            How do I handle customer complaints or feedback?
          </AccordionTrigger>
          <AccordionContent>
            You can view customer ratings and reviews in real time. If there's
            an issue, you can respond directly to customers through the app to
            offer solutions or compensation.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>How are payments handled?</AccordionTrigger>
          <AccordionContent>
            Grabbzo handles all transactions through secure payment gateways.
            You’ll receive regular payouts for your orders, typically on a
            weekly basis.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>
            How do I track the performance of my restaurant on Grabbzo?
          </AccordionTrigger>
          <AccordionContent>
            We provide an analytics dashboard where you can track order volume,
            customer preferences, and other key metrics to help you optimize
            your restaurant’s performance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Faq;
