import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const HomeCard = () => {
  return (
    <Card
      className="m-4 cursor-pointer p-8 shadow-xl shadow-yellow-500/40 transition-transform hover:scale-105
    md:w-[350px]
    "
    >
      <CardHeader>
        <CardTitle className="overflow-hidden text-center font-bold dark:text-white">
          <p className="primary-yellow">test</p>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default HomeCard;
