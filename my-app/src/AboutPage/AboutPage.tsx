import React from 'react';
import { db } from '../data';
import { Instagram } from "../HomePage/HomePage";
import { FooterMain, HeaderMain, SizeWrapper, Gallery } from "../shared";

interface AboutPageProps{

}
export function AboutPage(props:AboutPageProps){
  return(
    <div className="about">
      <HeaderMain />
      <sub-header class="about-title">About</sub-header>
      <SizeWrapper>
        <img-wrapper>
          <img className="about-img" src="https://dummyimage.com/480x720/ff00ff/000000&text=About+Me" />
        </img-wrapper>
        <about-blurb>
          <p>Hi Everyone! My name is Brittany, or B for short.</p>
          <p>All I ever wanted to do is be able to go through the activities of my day, (from the gym to yoga, to running errands and out to dinner) while looking effortlessly adorable. You might say that is unreasonable, but that’s why I started Bizzybcrafts. The only thing I love just as much as I love creating headbands is helping people look effortlessly adorable throughout their busy day. If looking put together despite not having had time to wash your hair is on your bucket list, you've come to the right place.</p>
          <p className="about-who">Who is B?</p>
          <p>I am 31 and I was born and raised in New York. When I started this business I had no idea how to sew. Over the years I taught myself how to sew and fell in love with it. After doing this as a side hustle for 7 years, I quit my job in April 2019 to do this full time! Being able to create something with my hands that someone will wear fills me with so much excitement.</p>
          <p>I hope you enjoy your stay at bizzybcrafts.com! Sign up for my newsletter in the footer below for special perks, coupons and sneak peeks!</p>
          <p>XO</p>
        </about-blurb>
        <Gallery title="@BizzyClone on Instagram"><Instagram /><Instagram /><Instagram /><Instagram /></Gallery>
      </SizeWrapper>
      <FooterMain />
    </div>
  );
}