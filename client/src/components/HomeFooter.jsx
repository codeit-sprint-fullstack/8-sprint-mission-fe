function HomeFooter(){
    return (
        <footer>
            <div id="copyright">©codeit - 2024</div>
            <div id="footerMenu">
                <a href="privacy.html">Privacy Policy</a>
                <a href="faq.html">FAQ</a>
            </div>
            <div id="socialMedia">
                <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 페이스북" //aira-label은 카멜케이스를 안 쓰네요;;
                ><img src="images/social/facebook-logo.svg" alt="페이스북" width="20"
                /></a>
                <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 트위터"
                ><img src="images/social/twitter-logo.svg" alt="트위터" width="20"
                /></a>
                <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 유튜브"
                ><img src="images/social/youtube-logo.svg" alt="유튜브" width="20"
                /></a>
                <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 인스타그램"
                ><img
                    src="images/social/instagram-logo.svg"
                    alt="인스타그램"
                    width="20"
                /></a>
            </div>
        </footer>
    );
}

export default HomeFooter;