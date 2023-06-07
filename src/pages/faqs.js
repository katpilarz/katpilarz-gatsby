import * as React from "react"
import { graphql } from "gatsby";
import PageSingle from "../components/page/pageSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import Header from "../components/globalSections/header";
import Seo from "../components/globalComponents/seo";
import AnimatedBtn from "../components/globalComponents/animatedBtn";
import Media from 'react-media';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';





export const query = graphql`
  query {
    faqsPage:allSanityPage(filter: {name: {eq: "faqs"}}) {
      edges {
        node {
          id
          overview
          title
          slug {
            current
          }
          image {
            asset {
              url
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
            }
            alt
          }
        }
      }
    }
    faqs:allSanityFaq(sort: {order: DESC, fields: publishedAt}) {
      edges {
        node {
          isFeaturedInService
          question
          _rawAnswer
          publishedAt
        }
      }
    }
  }
`





// markup
const FrequentQuestions = props => {
  const { data, errors } = props;

  const faqs = (data || {}).faqs.edges;
  const faqsPage = (data || {}).faqsPage.edges[0];


  const keywords = faqs.map((faq) => {
    return faq.node.question;
  });

  const [isHome] = useState(false)
  useEffect(() => window.scrollTo(0, 0), []) 


  if (errors) {
    return (
      navigate(`/404`)
    );
  }

  return (
    <main>
      <Seo title={faqsPage.node.title} description={faqsPage.node.overview} overview={faqsPage.node.overview} keywords={keywords}  />
      <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />
      <PagePreloader/>
      <Header isHome={isHome}/>
      <PageSingle faqs={faqs} pageName={faqsPage.node.name} pageTitle={faqsPage.node.title} pageImage={faqsPage.node.image} pageDescription={faqsPage.node.overview}/>
    </main>
  )
}

export default FrequentQuestions
