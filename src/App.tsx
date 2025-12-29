import Cards from '@/components/cards/Cards';
import HeroSection from '@/layouts/HeroSection';
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon as HeartOutlineIcon,
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Avatar } from '@heroui/react';
import { useTheme } from '@heroui/use-theme';
import { useState } from 'react';
useTheme;

function App() {
  const [likes, setLikes] = useState(false);

  return (
    <div>
      <HeroSection
        firstChild={
          <div className="flex items-center justify-center px-4 h-full w-full py-10 md:py-0">
            <div className="w-full max-w-[350px] aspect-[9/19] border-[6px] border-gray-900 rounded-[2.5rem] shadow-xl/30 overflow-hidden bg-white relative">
              <div className="w-40 rounded-full h-8 absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 border"> </div>
            </div>
          </div>
        }
        secondChild={
          <div className="flex flex-col items-center justify-center relative gap-8 py-10 w-full px-4 md:px-0 md:grid md:grid-cols-2 md:grid-rows-3 md:h-full md:py-0 md:gap-0">
            <div className="relative z-10 text-center md:col-span-2 md:row-start-2 md:place-self-center">
              <p className="text-4xl md:text-7xl font-bold text-indigo-900 text-shadow-lg/10">John Paul Naag</p>
              <p className="text-sm md:text-lg mt-2 text-indigo-900">
                The strongest of all time. Aspiring Full Stack Developer.
              </p>
            </div>
            <div className="relative w-full flex justify-center md:block md:w-auto md:col-start-1 md:row-start-1 md:justify-self-start md:self-end md:ml-10 md:mb-5">
              <Cards
                props={{ radius: 'none' }}
                header={
                  <div>
                    <p className="inline text-sm">katarinablu</p>{' '}
                    <CheckBadgeIcon className="inline size-4 mb-1 text-blue-500" />
                  </div>
                }
                body={
                  <p>
                    Me and <span className="font-bold">John Paul</span> are officially daring the rumors <br /> about us
                    is true. <span className="font-bold">#사랑에 빠지다</span>
                  </p>
                }
                footer={
                  <div>
                    {likes ? (
                      <HeartIcon
                        className="inline size-6 mb-1 cursor-pointer text-red-500"
                        onClick={() => setLikes(false)}
                      />
                    ) : (
                      <HeartOutlineIcon className="inline size-6 mb-1 cursor-pointer" onClick={() => setLikes(true)} />
                    )}{' '}
                    <p className="inline">34.6 M likes</p>
                    &nbsp;&nbsp;&nbsp;
                    <ChatBubbleOvalLeftIcon className="inline size-6 mb-1" /> <p className="inline">3.4 M comments</p>
                  </div>
                }
                customContent={
                  <img src="./profiles/karina.png" alt="karina" className="w-[100%] h-[100%] object-cover" />
                }
              />
            </div>
            <div className="relative w-full flex justify-center md:block md:w-auto md:col-start-2 md:row-start-1 md:justify-self-end md:self-end md:mr-10 md:mb-5">
              <Cards
                header={
                  <div className="flex flex-row items-center gap-2">
                    <Avatar src="./profiles/taylor.png" size="lg" />
                    <div>
                      <p>Taylor Swift</p>
                      <p className="text-xs">@taylorswift13</p>
                    </div>
                    <CheckBadgeIcon className="size-4 mb-5 text-blue-500" />
                  </div>
                }
                body={
                  <p>
                    I hope I can collaborate with you <br /> soon, <span className="text-sky-400">@Naag</span>
                    😭😭🙏🙏
                  </p>
                }
                footer={
                  <div>
                    <p className="font-bold">#taylorXpaul</p>
                    <p className="font-bold">#taylorswift</p>
                    <p className="font-bold">#johnpaulnaag</p>
                    <p className="font-bold">#gamechanger</p>
                  </div>
                }
              />
            </div>
            <div className="relative w-full flex justify-center md:block md:w-auto md:col-start-1 md:row-start-3 md:justify-self-start md:self-start md:ml-10 md:mt-0">
              <Cards
                header={
                  <div className="flex flex-row items-center gap-2 w-full">
                    <Avatar src="./profiles/trump.png" size="sm" className="object-cover" />
                    <div>
                      <p>Donald J. Trump</p>
                      <p className="text-xs">@realDonaldTrump</p>
                    </div>
                    <CheckBadgeIcon className="size-4 mb-5 mr-auto text-blue-500" />
                    <EllipsisHorizontalIcon className="size-6" />
                  </div>
                }
                body={
                  <>
                    <p>
                      I would like to thank to <span className="font-bold">Naag</span> for he did in this <br />
                      country, his contribution will always be <br /> appreciated. I hope i visit to your country soon!
                    </p>
                    <p className="text-xs text-gray-500 mt-3">11:22 AM ● Dec 21, 2022</p>
                  </>
                }
                footer={
                  <div>
                    <div className="flex flex-row items-center gap-4 *:text-sm *:text-gray-500">
                      <p>85,465 Retweets</p> <p>35,295 Quote tweets</p> <p>100, 789 Likes</p>
                    </div>
                    <div className="flex flex-row items-center justify-between p-4 *:size-6">
                      <ChatBubbleOvalLeftIcon className="text-gray-500" />{' '}
                      <ArrowPathRoundedSquareIcon className="text-gray-500" /> <HeartIcon className="text-red-500" />
                      <ArrowUpTrayIcon className="text-gray-500" />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="relative w-full flex justify-center md:block md:w-auto md:col-start-2 md:row-start-3 md:justify-self-end md:self-start md:mr-20 md:mt-5">
              <Cards
                className="flex items-center"
                header={
                  <div className="flex flex-col w-full items-center gap-2 justify-center">
                    <Avatar
                      src="./profiles/lebron.png"
                      size="lg"
                      className="object-cover h-[100px] w-[100px]"
                      isBordered
                    />
                    <div>
                      <p className="inline">LeBron James</p>
                      <CheckBadgeIcon className="inline size-4 ml-1 mb-1 text-blue-500" />
                    </div>
                  </div>
                }
                body={
                  <p>
                    Solid kasama yan si <span className="font-bold">Naag</span> masarap <br /> kasama. I miss you bro!
                  </p>
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default App;
