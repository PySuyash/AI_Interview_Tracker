import "./Footer.css";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Main Footer Content */}
        <div className="footerMain">
          {/* Brand Section */}
          <div className="footerBrand">
            <h2>AI Interview Tracker</h2>

            <p>
              Practice smarter. Track your progress. Get ready to ace your next
              interview.
            </p>
          </div>

          {/* Product Links */}
          <div className="footerColumn">
            <h3>Product</h3>

            {/* <a href="/dashboard">
              Dashboard
            </a> */}

            <Link to="/dashboard">Dashboard</Link>

            {/* <a href="/createinterview">
              Create Interview
            </a> */}

            <Link to="/createinterview">Create Interview</Link>

            {/* <a href="/history">
              Interview History
            </a> */}

            <Link to="/history">Interview History</Link>
          </div>

          {/* Resources */}
          <div className="footerColumn">
            <h3>Resources</h3>

            {/* <a href="/clearlocalstorage">
              Clear Local Storage
            </a> */}

            <Link to="/clearlocalstorage">Clear Local Storage</Link>

            {/* <a href="#">
              Documentation
            </a> */}

            <Link to="/documentation">Documentation</Link>

            {/* <a href="#">
              Help Center
            </a> */}

            <Link to="/helpcenter">Help Center</Link>
          </div>

          {/* CTA Section */}
          <div className="footerCTA">
            <h3>Ready to practice?</h3>

            <p>Start your next mock interview and improve your skills.</p>

            <Link to="/createinterview" className="footerCTAButton">
              Start Interview
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footerBottom">
          <p>© 2026 AI Interview Tracker. All rights reserved.</p>

          <div className="footerBottomLinks">
            {/* <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a> */}

            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <p>Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
