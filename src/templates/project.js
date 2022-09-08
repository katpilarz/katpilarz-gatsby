import React from "react";
import { graphql } from "gatsby";
/*import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";*/
import Layout from "../components/layout";




const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.sampleProject;
  return (
    <Layout>
      {/*{errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} />}*/}
    </Layout>
  );
};

export default ProjectTemplate;
