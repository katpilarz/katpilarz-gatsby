import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import ProjectSingle from "../components/project/projectSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import Header from "../components/globalSections/header";
import AnimatedBtn from "../components/globalComponents/animatedBtn";
import Media from 'react-media';
import { useEffect, useState} from 'react';
import { navigate } from 'gatsby';









export const query = graphql`
query ProjectTemplateQuery($id: String!){
  video:sanityHome {
    featuredVideo{
      alt
      fallback {
        asset {
          url
          extension
          altText
        }
      }
      webm {
        asset {
          altText
          url
          extension
        }
      }
    }
  }
  singleProject: sanityProject(id: { eq: $id }) {
      id
      header
      isDevelopment
      isInteractive
      overview
      publishedAt(formatString: "YYYY")
      scope
      slug {
        current
      }
      title
      url
      prototype {
        fallback {
          asset {
            url
            extension
          }
        }
        alt
        webm {
          asset {
            url
            extension
          }
        }
      }
      mockups {
        alt
        asset {
          url
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      desktopMockups {
        alt
        asset {
          url
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      bannerImage {
        asset {
          url
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
        alt
      }
      socialMediaImage {
        alt
        asset {
          url
        }
      }
      services {
        slug {
          current
        }
        title
      }
      _rawDetails
      tools
      isTestimonial
      _rawTestimonial
      nextProject {
        bannerImage {
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: WEBP)
          }
          alt
        }
        title
        slug {
          current
        }
      }
    }
  }
`


const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.singleProject;

  // BELOW WILL BE DELETED ONCE SCHEMA FOR VIDEO IS UPDATED

  const [isHome] = useState(false)

  useEffect(() => window.scrollTo(0, 0), []) 

  

  if (errors) {
    return (
      navigate(`/404`)
    );
  }


  return (

      <main>
        <PagePreloader/>
        <Seo title={project.title} description={project.description} overview={project.header} />
        <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />
        <Header isHome={isHome}/>
        <ProjectSingle project={project} isHome={isHome}/>
      </main>
      
  );
};

export default ProjectTemplate;
