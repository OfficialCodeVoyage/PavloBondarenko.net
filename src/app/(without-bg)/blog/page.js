'use client'
import Link from 'next/link';

const BlogPage = () => {
    return (
        <>
            <section className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content" data-aos="fade-up">
                        <p>HOME - BLOG</p>
                        <h1 className="section-heading"><img src="/images/star-2.png" alt="Star"/> Blog with
                            rightsidebar <img src="/images/star-2.png" alt="Star"/></h1>
                    </div>
                </div>
            </section>
            
            <section className="blog-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="blog-items">
                                <div className="blog-item" data-aos="zoom-in">
                                    <div className="img-box">
                                        <img src="/images/blog1.jpeg" alt="Blog"/>
                                    </div>
                                    <div className="content">
                                        <span className="meta">25 March 2022 - Comments (4) - Share (7)</span>
                                        <h1><Link href="/blog-details">Consulted admitting is power acuteness.</Link></h1>
                                        <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor
                                            rhoncus dolor purus non enim praesent in elementum sahas facilisis leo, vel
                                            fringilla est ullamcorper eget nulla facilisi etisam dignissim diam quis
                                            enim lobortis viverra orci sagittis eu volutpat odio facilisis mauris
                                            sit.</p>
                                        <Link href="/blog-details" className="theme-btn">Read More</Link>
                                    </div>
                                </div>

                                <div className="blog-item" data-aos="zoom-in">
                                    <div className="img-box">
                                        <img src="/images/blog2.jpeg" alt="Blog"/>
                                    </div>
                                    <div className="content">
                                        <span className="meta">25 March 2022 - Comments (4) - Share (7)</span>
                                        <h1><Link href="/blog-details">Unsatiable entreaties may collecting Power.</Link>
                                        </h1>
                                        <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor
                                            rhoncus dolor purus non enim praesent in elementum sahas facilisis leo, vel
                                            fringilla est ullamcorper eget nulla facilisi etisam dignissim diam quis
                                            enim lobortis viverra orci sagittis eu volutpat odio facilisis mauris
                                            sit.</p>
                                        <Link href="/blog-details" className="theme-btn">Read More</Link>
                                    </div>
                                </div>

                                <div className="blog-item" data-aos="zoom-in">
                                    <div className="img-box">
                                        <img src="/images/blog1.jpeg" alt="Blog"/>
                                    </div>
                                    <div className="content">
                                        <span className="meta">25 March 2022 - Comments (4) - Share (7)</span>
                                        <h1><Link href="/blog-details">Discovery incommode earnestly he commanded</Link>
                                        </h1>
                                        <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor
                                            rhoncus dolor purus non enim praesent in elementum sahas facilisis leo, vel
                                            fringilla est ullamcorper eget nulla facilisi etisam dignissim diam quis
                                            enim lobortis viverra orci sagittis eu volutpat odio facilisis mauris
                                            sit.</p>
                                        <Link href="blog-details" className="theme-btn">Read More</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="blog-sidebar">
                                <div className="blog-sidebar-inner">

                                    <div className="blog-sidebar-widget search-widget">
                                        <div className="blog-sidebar-widget-inner" data-aos="zoom-in">
                                            <form className="shadow-box">
                                                <input type="text" placeholder="Search Here..."/>
                                                <button className="theme-btn">Search</button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="blog-sidebar-widget recent-post-widget" data-aos="zoom-in">
                                        <div className="blog-sidebar-widget-inner shadow-box">
                                            <h3>Recent Posts</h3>

                                            <ul>
                                                <li><Link href="/blog-details">Consulted admitting is power
                                                    acuteness.</Link></li>
                                                <li><Link href="/blog-details">Unsatiable entreaties may collecting
                                                    Power.</Link></li>
                                                <li><Link href="/blog-details">Discovery incommode earnestly no he
                                                    commanded</Link></li>
                                                <li><Link href="/blog-details">Unsatiable entreaties may collecting
                                                    Power.</Link></li>
                                            </ul>

                                        </div>
                                    </div>

                                    <div className="blog-sidebar-widget categories-widget" data-aos="zoom-in">
                                        <div className="blog-sidebar-widget-inner shadow-box">
                                            <h3>Categories</h3>

                                            <ul>
                                                <li><Link href="/blog-details">-Analysis</Link></li>
                                                <li><Link href="/blog-details">-Firewall</Link></li>
                                                <li><Link href="/blog-details">-IT Solutions</Link></li>
                                                <li><Link href="/blog-details">-Security</Link></li>
                                                <li><Link href="/blog-details">-Technology</Link></li>
                                            </ul>

                                        </div>
                                    </div>

                                    <div className="blog-sidebar-widget tags-widget" data-aos="zoom-in">
                                        <div className="blog-sidebar-widget-inner shadow-box">
                                            <h3>Tags</h3>

                                            <ul>
                                                <li><Link className="theme-btn" href="/blog-details">SAAS</Link></li>
                                                <li><Link className="theme-btn" href="/blog-details">Development</Link>
                                                </li>
                                                <li><Link className="theme-btn" href="/blog-details">UI/UX</Link></li>
                                                <li><Link className="theme-btn" href="/blog-details">Web</Link></li>
                                                <li><Link className="theme-btn" href="/blog-details">Figma</Link></li>
                                                <li><Link className="theme-btn" href="/blog-details">Java</Link></li>
                                                <li><Link className="theme-btn" href="/blog-details">WordPress</Link></li>
                                            </ul>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPage;