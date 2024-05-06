import classNames from 'classnames';
import parse from 'html-react-parser';

type SingleTypography = {
  htmlCopy: string;
  className: string;
  style?: React.CSSProperties;
};

const MainTitle = ({ htmlCopy, className, style }: SingleTypography) => {
  const classes = 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl';

  return (
    <h1 className={classNames(classes, className)} style={style}>
      {parse(htmlCopy)}
    </h1>
  );
};

const SecondaryTitle = ({ htmlCopy, className, style }: SingleTypography) => {
  const classes = 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl';

  return (
    <h2 className={classNames(classes, className)} style={style}>
      {parse(htmlCopy)}
    </h2>
  );
};

const MainBody = ({ htmlCopy, className, style }: SingleTypography) => {
  const classes = 'text-lg lg:text-xl xl:text-2xl 2xl:text-3xl';
  return (
    <p className={classNames(classes, className)} style={style}>
      {parse(htmlCopy)}
    </p>
  );
};

const variantsMap = {
  h1: MainTitle,
  h2: SecondaryTitle,
  p: MainBody,
};

type TypographyProps = {
  variant: keyof typeof variantsMap;
  htmlCopy: string;
  classes: string;
  style?: React.CSSProperties;
};

const Typography = ({ variant, htmlCopy, classes, style }: TypographyProps) => {
  const Component = variantsMap[variant] || MainBody;

  return <Component htmlCopy={htmlCopy} className={classes} style={style} />;
};

export default Typography;
