/* eslint-disable react/prop-types */
function Icon({ fontSize = "", text = "", title = "" }) {
  return (
    <span
      style={{ fontSize: fontSize }}
      className="material-icons-outlined"
      title={title}
    >
      {text}
    </span>
  );
}

function PersonIcon({ fontSize = "" }) {
  return <Icon text="person" fontSize={fontSize} title="My account" />;
}

function FavoriteIcon({ fontSize = "" }) {
  return <Icon text="favorite" fontSize={fontSize} title="Favorite posts" />;
}

function UploadIcon({ fontSize = "" }) {
  return <Icon text="upload" fontSize={fontSize} title="Upload file" />;
}

function LogoutIcon({ fontSize = "" }) {
  return <Icon text="logout" fontSize={fontSize} title="Logout" />;
}

function PersonalPostsIcon({ fontSize = "" }) {
  return <Icon text="speaker_notes" fontSize={fontSize} title="My posts" />;
}

function VisibilityIcon({ fontSize = "" }) {
  return <Icon text="visibility" fontSize={fontSize} title="Visibility" />;
}

function VisibilityOffIcon({ fontSize = "" }) {
  return (
    <Icon text="visibility_off" fontSize={fontSize} title="Visibility off" />
  );
}

function InfoIcon({ fontSize = "" }) {
  return <Icon text="info" fontSize={fontSize} title="info" />;
}

export {
  PersonIcon,
  FavoriteIcon,
  UploadIcon,
  LogoutIcon,
  PersonalPostsIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  InfoIcon,
};
