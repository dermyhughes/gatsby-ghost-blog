import Helmet from 'react-helmet';
import React from 'react';

import '../../styles/app.scss';

function CVRaw() {
  return (
    <>
      <Helmet>
        <meta name='robots' content='noindex' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <title>Dermot Hughes CV</title>
      </Helmet>

      <div id='cv-body'>
        <div id='cv'>
          <div className='mainDetails'>
            <div id='name'>
              <h1>Dermot Hughes</h1>
              <h2>Front End Developer</h2>
            </div>
            <div id='contactDetails'>
              <ul>
                <li>
                  <img src='/images/icons/email.svg' alt='email icon' />
                  <a
                    href='mailto:contact@dermothughes.com'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    contact@dermothughes.com
                  </a>
                </li>
                <li>
                  <img src='/images/icons/web.svg' alt='website icon' />
                  <a href='http://www.dermothughes.com'>www.dermothughes.com</a>
                </li>
                <li>
                  <img src='/images/icons/phone.svg' alt='phone icon' />
                  (+44) 7818893798
                </li>
              </ul>
            </div>
            <div className='clear' />
          </div>
          <div id='mainArea'>
            <section>
              <article>
                <div className='sectionTitle'>
                  <h1>Personal Profile</h1>
                </div>
                <div className='coverLetter sectionContent'>
                  <p>
                    UX Engineer based in Belfast, Northern Ireland, specializing in{' '}
                    <a
                      href='https://dermothughes.com/is-the-title-front-end-developer-dead/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      &quot;Front of the Front End&quot;.
                    </a>{' '}
                    Passionate about bridging the gap between design and development to create
                    seamless user experiences.
                  </p>
                </div>
              </article>
              <div className='clear' />
            </section>
            <section>
              <div className='sectionTitle'>
                <h1>Work Experience</h1>
              </div>
              <div className='sectionContent'>
                <article>
                  <h2>Senior Software Engineer</h2>
                  <p className='subDetails'>April 2022 - Present</p>
                  <p> Technical Lead Engineer for internal Design System. </p>
                  <h2>Software Engineer II</h2>
                  <h3>Bazaarvoice</h3>
                  <p className='subDetails'>Feburary 2021 - April 2022</p>
                  <p>
                    Front End Developer using React. Focusing on developing and managing an internal
                    design system of reusable React components, Design Tokens, and more.
                  </p>
                </article>
                <article>
                  <h2>UX Developer</h2>
                  <h3>Atto Partners</h3>
                  <p className='subDetails'>September 2020 - December 2020</p>
                  <p>
                    Front End Development with a particular focus on UI and UX. Worked on a series
                    of projects both greenfield and legacy, with a variety of stacks including Vue
                    and Ruby on Rails.
                  </p>
                </article>
                <article>
                  <h2>Front End Engineer</h2>
                  <h3>Micro Focus</h3>
                  <p className='subDetails'>October 2019 - September 2020</p>
                  <p>
                    Front End Development using the Angular framework. Developing and maintaining an
                    open and closed source design system and UI Angular component library,
                    <a href='https://uxaspects.github.io/UXAspects/#/landing'> UX Aspects</a>.
                    Application development for UI of
                    <a href='https://www.microfocus.com/en-us/products/digital-safe-cloud-archiving/overview'>
                      {' '}
                      Digital Safe
                    </a>
                    .
                  </p>
                </article>

                <article className='second-job'>
                  <h2>Front End Engineer</h2>
                  <h3>Reward</h3>
                  <p className='subDetails'>April 2018 - October 2019</p>
                  <p>
                    Front End Development incorporating HTML5, CSS3, and JavaScript ES6+/TypeScript
                    using the Angular framework. UX and UI Design for Web applications. Wireframing,
                    rapid prototyping, mockups, user research, and analytics. Public facing sites
                    and internal/client facing interfaces, including front-end development and UX
                    design. Email design and development for award winning bank loyalty programmes.
                  </p>
                </article>
                <article>
                  <h2>Email Development Lead</h2>
                  <h3>Chain Reaction Cycles</h3>
                  <p className='subDetails'>October 2016 - April 2018</p>
                  <p>
                    Lead Developer and Line Manager for the Email Marketing team for Chain Reaction
                    Cycles - The World&apos;s Largest Online Bike Store. Responsible for the
                    creation and delivery of responsive mobile-first commercial and CRM emails
                    worldwide. Working to extreme deadlines and turnarounds as short as hours.
                  </p>
                </article>
                <article>
                  <h2>Technical Support Engineer</h2>
                  <h3>Engage</h3>
                  <p className='subDetails'>April 2016 - October 2016</p>
                </article>
                <article>
                  <h2>Desktop Support Engineer</h2>
                  <h3>Egton Health (EMIS)</h3>
                  <p className='subDetails'>June 2014 - March 2016</p>
                </article>
              </div>
              <div className='clear' />
            </section>
            <section id='education'>
              <div className='sectionTitle'>
                <h1>Education</h1>
              </div>
              <div className='sectionContent'>
                <article>
                  <h2>BSc (Hons) Creative Technologies</h2>
                  <h3>University of Ulster, Magee</h3>
                  <p className='subDetails'>First Class Honours</p>
                  <br />
                </article>
                <article>
                  <h2>BTEC National Diploma in Multimedia</h2>
                  <h3>Southern Regional College, Newry</h3>
                  <p className='subDetails'>MMM</p>
                  <br />
                </article>
                <article>
                  <h2>GCSE/A Level</h2>
                  <h3>Abbey Grammar School, Newry</h3>
                  <p className='subDetails'>A-C including English, Maths, and ICT</p>
                  <br />
                </article>
              </div>
              <div className='clear' />
            </section>
            <section>
              <div className='sectionTitle'>
                <h1>Interests</h1>
              </div>
              <div className='sectionContent'>
                <article>
                  <p>
                    In my free time I enjoy being creative if I can. I like photography and video
                    production, recording music, mountain biking, playing bass guitar, listening to
                    new music, watching ice hockey, cooking, and occasionally I’ve taken part as an
                    extra in TV and Film productions such as Game of Thrones and The Fall.
                  </p>
                  <p className='ref'>A list of references is available on request.</p>
                </article>
              </div>
              <div className='clear' />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVRaw;
