'use client';

import Image from 'next/image';
import { partners } from '@/lib/constants';

const OurPartners = () => {
  // Duplicate logos enough to cover a full cycle seamlessly
  const repeatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full overflow-hidden py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Our Partners</h2>
      <div className="relative w-full">
        <div className="flex animate-slide gap-12 py-6 whitespace-nowrap w-max">
          {repeatedPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={100}
                className="object-contain transition"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
