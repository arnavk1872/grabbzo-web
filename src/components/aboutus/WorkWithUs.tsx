
const WorkWithUs = () => {
    return (
      <div className="font-poppins px-16 w-full flex justify-between">
        <div>
          <div className="text-[30px] font-semibold">Work With Us</div>
          <div className="max-w-[800px] text-[18px]">
            At <span className="font-bold">Grabbzo</span>, we're always looking for passionate and talented individuals
            to join our journey. Whether you're a developer, designer, marketer, or
            just someone with a great idea, we'd love to hear from you!  
            
            Interested in working with us? Drop us an email at{" "}
            <a href="mailto:contact@grabbzo.com" className="underline text-blue-600 cursor-pointer hover:text-blue-500">
              contact@grabbzo.com
            </a>, and let's explore the possibilities together!
          </div>
        </div>
  
        <div className="h-96 w-2/5 bg-gray-400"></div>
      </div>
    );
  };
  
  export default WorkWithUs;
  