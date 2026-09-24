export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} Chukwuemeka Tobechukwu</span>
        <span>
          <a href="https://www.facebook.com/toriatochi/" target="_blank" rel="noopener noreferrer">Facebook</a>{" "}
          · <a href="https://twitter.com/chuks_tochi1?s=09" target="_blank" rel="noopener noreferrer">Twitter</a>{" "}
          · <a href="https://github.com/chukstochi" target="_blank" rel="noopener noreferrer">GitHub</a>
        </span>
      </div>
    </footer>
  );
}
