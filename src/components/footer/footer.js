import { memo, useMemo, useCallback } from "react";
import "./footer.css";

import { getApiUrl, getBaseUrl } from "../../config/api";
import useTheme from "../../hooks/useTheme";

const Footer = ({ state, dispatch, scrollToTop }) => {
  const themeData = useTheme(state);
  const themeStyle = {
    backgroundImage: themeData.backgroundImage,
    border: themeData.border,
  };

  const postsLength = state.posts.length;
  const maxChatPost = 15;

  // Memoize random posts to prevent recalculation on each render
  const randomPosts = useMemo(() => {
    if (postsLength < 5) return state.posts;
    return [...state.posts].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [state.posts, postsLength]);

  // Dynamic duration calculation for smooth scrolling
  const calculateScrollDuration = useCallback((length) => {
    return Math.max(15, Math.min(60, length * 3 + 10));
  }, []);

  const handleClickPage = useCallback(
    (page) => {
      dispatch({ type: "SELECT_PAGE", id: page.id });
      setTimeout(() => {
        scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    },
    [dispatch, scrollToTop],
  );

  const handleDeleteFeedback = async () => {
    const consent = window.confirm("Are you sure to delete the feedback?");
    if (!consent) return;
    const response = await fetch(getApiUrl("deleteFeedback"), {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: state.selectedPost.id }),
    });
    const data = await response.json();
    if (data.result === "success") {
      dispatch({ type: "DELETE_FEEDBACK", id: state.selectedPost.id });
      dispatch({ type: "CLOSE_POST" });
      setTimeout(() => dispatch({ type: "CLOSE_BANNER" }), 5000);
    }
  };

  const current = new Date().toISOString().split("T")[0];
  const baseUrl = getBaseUrl();

  return (
    <div className="footer" style={themeStyle}>
      <div className="useful-navigations">
        <div className="address">
          <h4>Address</h4>
          <div className="text" style={themeStyle}>
            <div style={{ fontWeight: "bolder", fontStyle: "italic", textDecoration: "underline" }}>Head Office</div>
            <div>
              2<sup>nd</sup> Floor,
            </div>
            <div>Gazala Ameen Building,</div>
            <div>Near MES College,</div>
            <div>Dabolim - 403726,</div>
            <div>Goa, MH</div>
            <hr></hr>
            <div style={{ fontWeight: "bolder", fontStyle: "italic", textDecoration: "underline" }}>Branch</div>
            <div>Karwar, Goa</div>
          </div>
        </div>
        <div className="footer-navigations">
          <h4>More Information</h4>
          <div className="text" style={themeStyle}>
            {state.pages.map(
              (page) =>
                page.id > 10 &&
                page.id <= 20 && (
                  <div
                    className="link"
                    style={{
                      backgroundImage: page.isSelected ? "linear-gradient(to right bottom, lightpink, lightyellow)" : themeData.backgroundImage,
                      border: themeData.border,
                    }}
                    key={page.id}
                    onClick={() => handleClickPage(page)}
                  >
                    {page.name}
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="posts">
          <h4>Feedbacks ({postsLength})</h4>
          <div className="posts-scroll-view" style={themeStyle}>
            <label>
              {postsLength ? (
                <>
                  <div>Recent</div>
                  <div style={{ fontSize: "medium" }}>(click on the card for details)</div>
                </>
              ) : (
                <div>(empty)</div>
              )}
            </label>
            <div className="footer-scroll" style={{ animation: `scrollFooter ${calculateScrollDuration(randomPosts.length)}s linear infinite normal` }}>
              {randomPosts.map((post, i) => (
                <div style={themeStyle} key={i} onClick={() => dispatch({ type: "DISPLAY_POST", id: post.id })}>
                  <div style={{ fontWeight: "bolder", fontSize: "smaller" }}>{post.date}</div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ marginBottom: "0", fontSize: "x-small", fontStyle: "italic" }}>{`${post.message.length > maxChatPost ? post.message.substring(0, maxChatPost) : post.message} ...`}</span>
                    <span style={{ textAlign: "right", fontSize: "x-small", fontStyle: "italic" }}>{`${post.by}`}</span>
                  </div>
                </div>
              ))}
            </div>
            {state.selectedPost !== "" && (
              <div className="post-card" style={themeStyle}>
                {state.signin.user ? <img loading="lazy" className="delete" src={`${baseUrl}/images/delete.png`} alt="delete" onClick={() => handleDeleteFeedback()} /> : ""}
                <img loading="lazy" className="close" src={`${baseUrl}/images/close.png`} alt="close" onClick={() => dispatch({ type: "CLOSE_POST" })} />
                <h4>{state.selectedPost.date}</h4>
                <div style={{ fontSize: "smaller", fontStyle: "italic" }}>{`"${state.selectedPost.message}"`}</div>
                <h5 style={{ fontSize: "smaller", textAlign: "right", fontStyle: "italic" }}>{`- ${state.selectedPost.by}`}</h5>
              </div>
            )}
          </div>
        </div>
        <div className="timings">
          <h4>Timings</h4>
          <div className="text" style={themeStyle}>
            {state.pages.map(
              (page) =>
                page.id > 20 &&
                page.id <= 30 && (
                  <div
                    className="link"
                    style={{
                      backgroundImage: page.isSelected ? "linear-gradient(to right bottom, lightpink, lightyellow)" : themeData.backgroundImage,
                      border: themeData.border,
                    }}
                    key={page.id}
                    onClick={() => handleClickPage(page)}
                  >
                    {page.name}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="visitor" style={themeStyle}>{`Visits ${state.visitors.length} | Today ${state.visitors.filter((visitor) => visitor.includes(current)).length}`}</div>
        <div className="message" style={themeStyle}>
          © 2025 Watson. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
