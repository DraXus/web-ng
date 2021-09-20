import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import FeaturedEvents from '../components/FeaturedEvents';
import EventPost from '../components/EventPost';
import EventSlide from '../components/EventSlide';

const Eventos = (props) => {
    const featuredEvents = props.data.featuredEvents.edges.map(({ node }) => {
        return {
            id: node.id,
            image: node.frontmatter.image,
            link: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.fullDate,
            logo: node.frontmatter.logo,
        };
    });
    const allEvents = props.data.allEvents.edges.map(({ node }) => {
        return {
            id: node.id,
            image: node.frontmatter.image,
            link: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.fullDate,
            logo: node.frontmatter.logo,
        };
    });

    return (
        <Layout bodyClass='page-default-single'>
            <SEO title='Eventos' />           

            <div className='pt-3'>
                <FeaturedEvents eventos={featuredEvents}></FeaturedEvents>
            </div>


            <div className='container pt-5'>
                {/* {<h2 className='title'>Eventos Pasados</h2>} */}
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-n2'>
                    {allEvents.map(evento => (
                    <EventPost evento={evento} key={evento.id}/>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query EventosQuery {
        featuredEvents: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/eventos/.*/" }, frontmatter: { featured: {eq: true}} }
            sort: { fields: [frontmatter___date], order: ASC }
        ) {
            edges {
                node {
                    id
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featured
                        image
                        fullDate
                        logo
                    }
                }
            }
        }
        allEvents: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/eventos/.*/" } }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    id
                    excerpt (pruneLength: 500)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featured
                        image
                        fullDate
                        logo
                    }
                    internal {
                        content
                    }
                }
            }
        }
    }
`;

export default Eventos;