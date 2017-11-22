import React, { Component } from 'react';
import { Grid, Button, Image, Divider, Header } from 'semantic-ui-react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import '../css/home.css';

class Home extends Component {
  render() {
    return (
        <DocumentTitle title='Potluck'>
        <Grid padded >
            <Grid.Row className="home-section banner" centered>
                {/*<Image wrapped className="bannerImg" src="img/Putluck.png" />*/}
                <Image wrapped className="blackOverlayImg" />
                <Grid.Column mobile={16} className="bannerOverlay"computer={8} tablet={10} textAlign="center" verticalAlign="middle">
                    <Header className="headerPotLuck">Potluck</Header>
                    <Header className="headerOrganizing">Organizing a party should be easy</Header>
                    <Divider horizontal className="headerOrganizing">It is.</Divider>
                    <p className="headerSignUp">Sign up with Potluck and start organizing.</p>
                    <Button className="signUpBtn" color='olive' as={Link} to="/register">Sign Up</Button>
                    <div className="headerAlready">Already registered? <Link color='blue'to="/login">Log in.</Link></div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className="home-section" color="olive" verticalAlign="middle">
                <Grid.Column mobile={16} computer={8} tablet={8}  className="secondBannerImg"  >
                    <Image wrapped className="greenOverlayImg" />
                </Grid.Column>
                <Grid.Column mobile={16} computer={8} tablet={8} textAlign="center">
                    <Header className="headerSimpleClean">"Simple. Clean. Just works like Magic."</Header>
                    <hr className="dividerForSecondBanner"/>
                    <div className="secondBannerText">
                        <p>Make an invite.</p>
                        <p>Send out an event.</p>
                        <p>Pledge your dishes.</p>
                        <p className="secondBannerTextBold">Host your event.</p>
                    </div>
                    <hr className="dividerForSecondBanner dividerForSecondBannerTwo"/>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className="home-section" verticalAlign="middle" textAlign="center" >
                <Grid.Column mobile={16} computer={8} tablet={8} >
                    <Header className="headerTake">"Take it on the go"</Header>
                    <hr className="dividerForSecondBannerThird"/>
                    <div className="thirdBannerText" textAlign="center" verticalAlign="middle">
                        <p >Pledge and keep track of your </p>
                        <p>events on your mobile device </p>
                        <p>with our mobile apps.</p>
                    </div>
                    <hr className="dividerForSecondBannerThird dividerForSecondBannerTwo"/>
                </Grid.Column>
                <Grid.Column mobile={16} computer={8} tablet={8} className="thirdBannerImg">
                    <Image wrapped className="yellowOverlayImg" />
                    <div className="downloadBtn">
                    <Image wrapped src="icons/google-play-badge.png" size="small" onClick={(e)=>window.location.href="https://play.google.com/store"}/>
                    <Image wrapped src="icons/apple-store-badge.svg" onClick={(e)=>window.location.href="https://www.apple.com/ca/"}/>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className="home-section fourthBanner" centered>
                <Grid.Column mobile={16} computer={8} tablet={10} textAlign="center" verticalAlign="middle">
                    <Header className="headerSimpleClean">"Free to use"</Header>
                    <hr className="dividerForSecondBanner"/>
                        <Header className="greenColorText">Free to try.</Header>
                    <hr className="dividerForSecondBanner dividerForSecondBannerTwo"/>
                    <Header className="greenColorText paddingBottomten" >Sign up with Potluck and start organizing now.</Header>
                    <Button className="signUpBtn paddingBottomten" color='olive' as={Link} to="/register">Sign Up</Button>
                    <div className="headerAlready paddingBottomThirty">Already registered? <Link color='blue' to="/login">Log in.</Link></div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default Home;
