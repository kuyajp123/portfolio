import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';

interface CardProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  customContent?: React.ReactNode | string;
  className?: string;
  props?: any;
}

const Cards = ({ header, body, footer, customContent, className, props }: CardProps) => {
  return (
    <Card className={`flex flex-row justify-center w-fit h-fit ${className}`} {...props}>
      <div>
        <CardHeader>{header}</CardHeader>
        <CardBody>{body}</CardBody>
        <CardFooter>{footer}</CardFooter>
      </div>
      {customContent && <div>{customContent}</div>}
    </Card>
  );
};

export default Cards;
