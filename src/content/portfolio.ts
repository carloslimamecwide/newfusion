export type CaseStudy = {
  slug: string;
  image: string;
  tags: string[];
  pt: {
    title: string;
    client: string;
    challenge: string;
    solution: string;
    result: string;
    stack: string[];
  };
  en: {
    title: string;
    client: string;
    challenge: string;
    solution: string;
    result: string;
    stack: string[];
  };
};

export const cases: CaseStudy[] = [];
