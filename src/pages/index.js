import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import _ from 'lodash'

import { Layout } from '../layout'
import { Bio } from '../components/bio'
import { Head } from '../components/head'
import { Category } from '../components/category'
import { Contents } from '../components/contents'

import * as ScrollManager from '../utils/scroll'
import * as EventManager from '../utils/event-manager'
import * as Dom from '../utils/dom'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

import { HOME_TITLE, CATEGORY_TYPE } from '../constants'

const DEST_POS = 316
const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

export default ({ data, location }) => {
  const [category, setCategory] = useState(CATEGORY_TYPE.ALL)

  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category))

  useEffect(() => {
    ScrollManager.init()
    return () => {
      ScrollManager.destroy()
    }
  }, [])

  useEffect(() => {
    window.addEventListener(`scroll`, onScroll, { passive: false })
    return () => {
      window.removeEventListener(`scroll`, onScroll, { passive: false })
    }
  }, [])

  const [count, countRef, increaseCount] = useRenderedCount()
  useIntersectionObserver()

  const selectCategory = category => {
    setCategory(category)
    ScrollManager.go(DEST_POS)
    window.history.pushState({ category }, '', `?category=${category}`)
  }

  const onScroll = () => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  }

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Bio />
      <Category
        categories={categories}
        category={category}
        selectCategory={selectCategory}
      />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        category={category}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            draft
          }
        }
      }
    }
  }
`
