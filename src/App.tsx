import Cards from '@/components/cards/Cards';
import MobileDevice from '@/components/MobileDevice';
import HeroSection from '@/layouts/HeroSection';
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon as HeartOutlineIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon, CheckBadgeIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Avatar } from '@heroui/react';
import { useTheme } from '@heroui/use-theme';
import { EllipsisVertical, Search, Send, SquarePlay } from 'lucide-react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import House from './assets/house-solid-full.svg?react';
useTheme;

const images = ['./me/museum.png', './me/coffee.png', './me/laguna.png', './me/ov.png', './me/tanza.png'];

function App() {
  const [karinaLikes, setKarinaLikes] = useState(false);
  const [postLikes, setPostLikes] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <HeroSection
        firstChild={
          <div className="flex items-center justify-center px-4 h-full w-full py-10 md:py-0">
            <MobileDevice className="relative">
              <div className="flex flex-row items-center gap-3 px-3">
                <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] cursor-pointer">
                  <Avatar
                    src="./me/profile.png"
                    onClick={() => {}}
                    className="border-2 border-white box-content size-7"
                  />
                </div>
                <div className="mr-auto">
                  <p className="font-bold text-xs cursor-pointer">jeyps.css</p>
                  <p className="text-[10px]">Trece Martires, Cavite</p>
                </div>
                <EllipsisVertical size={20} className="cursor-pointer" />
              </div>

              <div className="h-[450px] w-full mt-2 relative">
                {/* Slide Counter */}
                <div className="absolute top-3 right-3 bg-black/50 text-gray-100 text-[10px] px-2 py-[2px] rounded-full z-50 font-bold">
                  {activeIndex + 1}/{images.length}
                </div>

                <div className="w-full h-full">
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
                    className="h-full"
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt="image" className="w-full h-full object-cover" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="w-full flex flex-row p-2">
                  <div className="flex flex-row mr-auto gap-2">
                    <div>
                      {postLikes ? (
                        <HeartIcon
                          className="size-6 inline mr-1 cursor-pointer text-red-500"
                          onClick={() => setPostLikes(false)}
                        />
                      ) : (
                        <HeartOutlineIcon
                          className="size-6 inline mr-1 cursor-pointer"
                          onClick={() => setPostLikes(true)}
                        />
                      )}
                      <p className="text-[10px] inline">12M</p>
                    </div>
                    <div>
                      <ChatBubbleOvalLeftIcon className="size-6 inline mr-1" />
                      <p className="text-[10px] inline">120,234</p>
                    </div>
                    <div>
                      <ArrowPathRoundedSquareIcon className="size-6 inline mr-1" />
                      <p className="text-[10px] inline">302,435</p>
                    </div>
                    <div>
                      <Send className="size-5 inline mr-1" strokeWidth={1.25} stroke="black" />
                      <p className="text-[10px] inline">11,673</p>
                    </div>
                  </div>
                  <BookmarkIcon className="size-6" />
                </div>

                <div className="px-2">
                  <p className="text-xs mb-1">
                    <span className="font-bold">jeyps.css</span> Hello World
                  </p>

                  <p className="text-[10px] text-gray-500">Dec 30</p>
                </div>

                <div className="absolute h-18 pb-4 w-full items-center justify-around flex flex-row -bottom-45 border border-gray-300 gap-1 z-50 bg-white dark:bg-gray-800">
                  <House className="size-6 " />
                  <SquarePlay size={20} strokeWidth={1.5} stroke="black" />
                  <Send size={20} strokeWidth={1.5} stroke="black" />
                  <Search size={20} strokeWidth={1.5} stroke="black" />
                  <Avatar src="./me/profile.png" className="size-6" />
                </div>
              </div>
            </MobileDevice>
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
                    {karinaLikes ? (
                      <HeartIcon
                        className="inline size-6 mb-1 cursor-pointer text-red-500"
                        onClick={() => setKarinaLikes(false)}
                      />
                    ) : (
                      <HeartOutlineIcon
                        className="inline size-6 mb-1 cursor-pointer"
                        onClick={() => setKarinaLikes(true)}
                      />
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
