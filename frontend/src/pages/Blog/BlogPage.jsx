// src/pages/Blog/BlogPage.jsx
import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, X, BookOpen } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import Button from '../../components/Button/Button';
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder';
import { blogData } from '../../data/blogData';
import './BlogPage.css';

const CATEGORIES = [
  'Vse', 
  'Zakonodaja in skladnost', 
  'Varjenje in tehnična dela', 
  'Vodenje delovne sile', 
  'Težka gradbena mehanizacija'
];

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Vse');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const filteredPosts = blogData.filter((post) => {
    const matchesCategory = selectedCategory === 'Vse' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-page">
      <SEO
        title="Gradbeni blog in vpogledi | Williams Constructions"
        description="Strokovni članki o delovnih dovoljenjih v slovenskem gradbeništvu, varilskih standardih, varnosti na gradbišču in učinkovitem vodenju gradbenih ekip."
        canonical="/blog"
      />

      <PageHero
        src="/images/blog-banner.webp"
        badge="Znanje in panožne novice"
        title="Gradbeni in kadrovski vpogledi"
        subtitle="Praktični vodniki o slovenski delovnopravni skladnosti, produktivnosti delavcev, standardih varjenja in varnosti na gradbišču."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <div className="blog-container section-py">
        <div className="container">
          {/* Search & Category Filter Toolbar */}
          <div className="blog-toolbar">
            <div className="blog-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Iskanje člankov..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                  aria-label="Počisti iskanje"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="no-articles-found">
              <BookOpen size={48} className="empty-icon" />
              <h2>Ni najdenih člankov</h2>
              <p>Poskusite spremeniti iskalni niz ali izberite drugo kategorijo.</p>
              <Button onClick={() => { setSelectedCategory('Vse'); setSearchQuery(''); }} variant="outline" size="sm">
                Ponastavi filtre
              </Button>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-img-wrap">
                    <ImagePlaceholder
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      aspectRatio="16/10"
                      category="welding"
                      filename={post.image}
                      caption={post.title}
                    />
                    <span className="blog-card-category">{post.category}</span>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="meta-item">
                        <Calendar size={13} /> {post.date}
                      </span>
                      <span className="meta-item">
                        <Clock size={13} /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="blog-card-title">{post.title}</h2>
                    
                    <p className="blog-card-summary">{post.summary}</p>

                    <div className="blog-card-footer">
                      <span className="blog-card-author">
                        <User size={13} /> Avtor: {/* {post.author} */}
                      </span>
                      <button
                        type="button"
                        className="blog-read-btn"
                        onClick={() => setActiveArticle(post)}
                      >
                        <span>Preberite več</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="article-modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div className="article-modal-window" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="article-modal-close"
              onClick={() => setActiveArticle(null)}
              aria-label="Zapri članek"
            >
              <X size={22} />
            </button>

            <div className="article-modal-header">
              <span className="article-modal-badge">{activeArticle.category}</span>
              <h2 className="article-modal-title">{activeArticle.title}</h2>
              <div className="article-modal-meta">
                <span><Calendar size={14} /> {activeArticle.date}</span>
                <span><User size={14} /> {activeArticle.author}</span>
                <span><Clock size={14} /> {activeArticle.readTime}</span>
              </div>
            </div>

            <div className="article-modal-image">
              <ImagePlaceholder
                src={activeArticle.image}
                alt={activeArticle.imageAlt || activeArticle.title}
                aspectRatio="21/9"
                category="welding"
                filename={activeArticle.image}
                caption={activeArticle.title}
              />
            </div>

            <div 
              className="article-modal-content"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

            <div className="article-modal-footer">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                onClick={() => setActiveArticle(null)}
              >
                Povprašajte za delovno silo za vaš projekt
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setActiveArticle(null)}
              >
                Nazaj na vse članke
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
