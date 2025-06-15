<template>
  <div ref="bp_view" class="absolute flex h-full w-full items-center justify-center">
    <div :style="{ width: `${bpViewData.width}px`, height: `${bpViewData.height}px` }">
      <div :style="{ scale: bpViewData.scale }" class="h-[1080px] w-[1920px] origin-top-left overflow-hidden bg-[#3f3f46]">
        <div v-show="pausing" class="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black bg-opacity-75">
          <h1 class="text-5xl font-bold text-white">暂停中...</h1>
        </div>
        <div class="absolute left-0 top-0 z-10">
          <img style="-webkit-user-drag: none" class="w-full" src="/img/顶部背景.png" />
        </div>

        <div class="absolute z-10 select-none">
          <div class="absolute left-[386px] top-[60px]">
            <div v-if="turn >= 0" class="absolute h-[94px] w-[94px] overflow-hidden">
              <img v-if="teamData.blueTeam.ban[0]" :class="{ picked: teamData.blueTeam.ban[0] }" class="absolute h-full w-full object-contain" :src="getBranchImage(teamData.blueTeam.ban[0], 'blue')" />
              <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 0" class="absolute h-full w-full bg-black bg-opacity-25"></div>
              <img v-show="getBranchImage(teamData.blueTeam.preSelect, 'blue') !== ''" class="breathing-light absolute h-full w-full object-contain" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 0 && !teamData.blueTeam.ban[0]" :src="getBranchImage(teamData.blueTeam.preSelect, 'blue')" />
            </div>

            <div class="absolute left-[24px] top-[74px] h-[40px] w-[112px]">
              <img src="/img/禁用图标.png" class="absolute -left-[48px] -top-[98px] h-[58px] w-[58px]" />
              <img class="absolute scale-[1.2]" src="/img/禁用分支背景.png" />
              <p class="absolute h-[40px] w-[112px] text-center text-2xl font-bold text-blue-team-color [line-height:40px]">
                <span v-if="teamData.blueTeam.ban[0]">{{ teamData.blueTeam.ban[0] }}</span>
                <span v-if="teamData.blueTeam.preSelect && !teamData.blueTeam.ban[0]">{{ getPreSelect() }}</span>
              </p>
            </div>
          </div>

          <div class="absolute left-[526px] top-[19px]">
            <div class="absolute">
              <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                <img :class="{ picked: teamData.blueTeam.ban[1] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.ban[1], 'blue')" />
                <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 1" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 1 && !teamData.blueTeam.ban[1]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
              </div>
              <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                <img src="/img/禁用图标.png" />
              </div>
            </div>
            <div class="absolute left-[106px]">
              <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                <img :class="{ picked: teamData.blueTeam.ban[2] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.ban[2], 'blue')" />
                <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 2" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 2 && !teamData.blueTeam.ban[2]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
              </div>
              <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                <img src="/img/禁用图标.png" />
              </div>
            </div>
            <div class="absolute left-[213px]">
              <div class="absolute h-[74px] w-[74px] overflow-hidden">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.blueTeam.ban[3] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.ban[3], 'blue')" />
                  <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 3" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 3 && !teamData.blueTeam.ban[3]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
                </div>
              </div>
              <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                <img src="/img/禁用图标.png" />
              </div>
            </div>
          </div>

          <div class="absolute left-[566px] top-[122px]">
            <div class="absolute">
              <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                <img :class="{ picked: teamData.blueTeam.ban[4] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.ban[4], 'blue')" />
                <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 4" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 4 && !teamData.blueTeam.ban[4]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
              </div>
              <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                <img src="/img/禁用图标.png" />
              </div>
            </div>
            <div class="absolute left-[106px]">
              <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                <img :class="{ picked: teamData.blueTeam.ban[5] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.ban[5], 'blue')" />
                <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 5" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 5 && !teamData.blueTeam.ban[5]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
              </div>
              <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                <img src="/img/禁用图标.png" />
              </div>
            </div>
            <div class="absolute left-[213px]">
              <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                <img :class="{ picked: teamData.blueTeam.ban[6] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.ban[6], 'blue')" />
                <div v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 6" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].action === 'ban' && states[turn].order === 6 && !teamData.blueTeam.ban[6]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
              </div>
              <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                <img src="/img/禁用图标.png" />
              </div>
            </div>
          </div>
        </div>

        <div class="absolute z-10">
          <div class="absolute left-[1433px] top-[60px]">
            <div v-if="turn >= 0" class="absolute h-[94px] w-[94px] overflow-hidden">
              <img v-if="teamData.redTeam.ban[0]" :class="{ picked: teamData.redTeam.ban[0] }" class="absolute h-full w-full object-contain" :src="getBranchImage(teamData.redTeam.ban[0],'red')" />
              <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 0" class="absolute h-full w-full bg-black bg-opacity-25"></div>
              <img v-show="getBranchImage(teamData.redTeam.preSelect,'red') !== ''" class="breathing-light absolute h-full w-full object-contain" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 0 && !teamData.redTeam.ban[0]" :src="getBranchImage(teamData.redTeam.preSelect,'red')" />
            </div>
            <div class="absolute left-[24px] top-[74px] h-[40px] w-[112px]">
              <img src="/img/禁用图标.png" class="absolute -left-[48px] -top-[98px] h-[58px] w-[58px]" />
              <img class="absolute right-[66px] scale-[1.2]" src="/img/禁用分支背景.png" />
              <p class="absolute right-[66px] h-[40px] w-[112px] text-center text-2xl font-bold text-red-team-color [line-height:40px]">
                <span v-if="teamData.redTeam.ban[0]">{{ teamData.redTeam.ban[0] }}</span>
                <span v-if="teamData.redTeam.preSelect && !teamData.redTeam.ban[0]">{{ getPreSelect() }}</span>
              </p>
            </div>
          </div>

          <div class="absolute z-10 select-none">
            <div class="absolute left-[1433px] top-[60px]">
              <div v-if="turn >= 0" class="absolute h-[94px] w-[94px] overflow-hidden">
                <img v-if="teamData.redTeam.ban[0]" :class="{ picked: teamData.redTeam.ban[0] }" class="absolute h-full w-full object-contain" :src="getBranchImage(teamData.redTeam.ban[0], 'red')" />
                <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 0" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                <img v-show="getBranchImage(teamData.redTeam.preSelect, 'red') !== ''" class="breathing-light absolute h-full w-full object-contain" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 0 && !teamData.redTeam.ban[0]" :src="getBranchImage(teamData.redTeam.preSelect, 'red')" />
              </div>
              <div class="absolute left-[24px] top-[74px] h-[40px] w-[112px]">
                <img src="/img/禁用图标.png" class="absolute -left-[48px] -top-[98px] h-[58px] w-[58px]" />
                <img class="absolute right-[66px] scale-[1.2]" src="/img/禁用分支背景.png" />
                <p class="absolute right-[66px] h-[40px] w-[112px] text-center text-2xl font-bold text-red-team-color [line-height:40px]">
                  <span v-if="teamData.redTeam.ban[0]">{{ teamData.redTeam.ban[0] }}</span>
                  <span v-if="teamData.redTeam.preSelect && !teamData.redTeam.ban[0]">{{ getPreSelect() }}</span>
                </p>
              </div>
            </div>

            <div class="absolute left-[1097px] top-[19px] select-none">
              <div class="absolute">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.redTeam.ban[3] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.ban[3], 'red')" />
                  <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 3" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 3 && !teamData.redTeam.ban[3]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                  <img src="/img/禁用图标.png" />
                </div>
              </div>
              <div class="absolute left-[106px]">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.redTeam.ban[2] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.ban[2], 'red')" />
                  <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 2" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 2 && !teamData.redTeam.ban[2]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                  <img src="/img/禁用图标.png" />
                </div>
              </div>
              <div class="absolute left-[213px]">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.redTeam.ban[1] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.ban[1], 'red')" />
                  <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 1" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 1 && !teamData.redTeam.ban[1]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                  <img src="/img/禁用图标.png" />
                </div>
              </div>
            </div>

            <div class="absolute left-[1060px] top-[122px] select-none">
              <div class="absolute">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.redTeam.ban[6] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.ban[6], 'red')" />
                  <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 6" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 6 && !teamData.redTeam.ban[6]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                  <img src="/img/禁用图标.png" />
                </div>
              </div>
              <div class="absolute left-[106px]">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.redTeam.ban[5] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.ban[5], 'red')" />
                  <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 5" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 5 && !teamData.redTeam.ban[5]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                  <img src="/img/禁用图标.png" />
                </div>
              </div>
              <div class="absolute left-[213px]">
                <div v-if="turn >= 0" class="absolute h-[74px] w-[74px] overflow-hidden">
                  <img :class="{ picked: teamData.redTeam.ban[4] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.ban[4], 'red')" />
                  <div v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 4" class="absolute h-full w-full bg-black bg-opacity-25"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 4 && !teamData.redTeam.ban[4]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <div class="absolute left-[42px] top-[42px] h-[42px] w-[42px]">
                  <img src="/img/禁用图标.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute top-[148px] z-20 flex w-full select-none justify-center" style="mask: url(/img/进度条.png); mask-repeat: no-repeat">
          <div :key="progressKey" v-if="turn >= 0 && !isDone()" :class="progressSelector()" class="h-[100px]"></div>
        </div>

        <div>
          <div class="absolute left-[100px] top-[6px] z-20 h-[128px] w-[111px]">
            <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
              <img class="h-full object-cover" v-if="teamData.blueTeam.players[0].qq !== ''" :src="`/api/QQAvatar?qq=${teamData.blueTeam.players[0].qq}`" />
            </div>
            <img class="absolute left-0 top-0 h-full w-full" src="/img/选手头像边框.png" />
            <div class="relative left-4 top-20 -rotate-[30deg]">
              <img class="absolute left-0 top-0 h-[33px] w-[128px]" src="/img/选手名背景.png" />
              <div class="absolute h-full w-full text-center [line-height:33px]">
                <p class="text-blue-team-color">{{ teamData.blueTeam.players[0].name }}</p>
              </div>
            </div>
          </div>
          <div class="absolute left-[200px] top-[92px] z-20 h-[128px] w-[111px]">
            <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
              <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
                <img class="h-full object-cover" v-if="teamData.blueTeam.players[1].qq !== ''" :src="`/api/QQAvatar?qq=${teamData.blueTeam.players[1].qq}`" />
              </div>
            </div>
            <img class="absolute left-0 top-0 h-full w-full" src="/img/选手头像边框.png" />
            <div class="relative left-[16px] top-[80px] -rotate-[30deg]">
              <img class="absolute left-0 top-0 h-[33px] w-[128px]" src="/img/选手名背景.png" />
              <div class="absolute h-full w-full text-center [line-height:33px]">
                <p class="text-blue-team-color">{{ teamData.blueTeam.players[1].name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="select-none">
          <div class="absolute left-[100px] top-[6px] z-20 h-[128px] w-[111px] select-none">
            <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
              <img class="h-full object-cover" v-if="teamData.blueTeam.players[0].qq !== ''" :src="`/api/QQAvatar?qq=${teamData.blueTeam.players[0].qq}`" />
            </div>
            <img class="absolute left-0 top-0 h-full w-full" src="/img/选手头像边框.png" />
            <div class="relative left-4 top-20 -rotate-[30deg]">
              <img class="absolute left-0 top-0 h-[33px] w-[128px]" src="/img/选手名背景.png" />
              <div class="absolute h-full w-full text-center [line-height:33px]">
                <p class="font-bold text-blue-team-color">{{ teamData.blueTeam.players[0].name }}</p>
              </div>
            </div>
          </div>
          <div class="absolute left-[200px] top-[92px] z-20 h-[128px] w-[111px] select-none">
            <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
              <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
                <img class="h-full object-cover" v-if="teamData.blueTeam.players[1].qq !== ''" :src="`/api/QQAvatar?qq=${teamData.blueTeam.players[1].qq}`" />
              </div>
            </div>
            <img class="absolute left-0 top-0 h-full w-full" src="/img/选手头像边框.png" />
            <div class="relative left-[16px] top-[80px] -rotate-[30deg]">
              <img class="absolute left-0 top-0 h-[33px] w-[128px]" src="/img/选手名背景.png" />
              <div class="absolute h-full w-full text-center [line-height:33px]">
                <p class="font-bold text-blue-team-color">{{ teamData.blueTeam.players[1].name }}</p>
              </div>
            </div>
          </div>
        </div>

              <div class="select-none">
          <div class="absolute right-[100px] top-[6px] z-20 h-[128px] w-[111px] select-none">
            <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
              <img class="h-full object-cover" v-if="teamData.redTeam.players[0].qq !== ''" :src="`/api/QQAvatar?qq=${teamData.redTeam.players[0].qq}`" />
            </div>
            <img class="absolute left-0 top-0 h-full w-full" src="/img/选手头像边框.png" />
            <div class="relative -left-[12px] top-[82px] rotate-[30deg]">
              <img class="absolute left-0 top-0 h-[33px] w-[128px]" src="/img/选手名背景.png" />
              <div class="absolute h-full w-full text-center [line-height:33px]">
                <p class="font-bold text-red-team-color">{{ teamData.redTeam.players[0].name }}</p>
              </div>
            </div>
          </div>
          <div class="absolute right-[200px] top-[92px] z-20 h-[128px] w-[111px] select-none">
            <div class="absolute left-0 top-0 h-full w-full bg-black" style="mask: url(/img/选手头像遮罩.png)">
              <img class="h-full object-cover" v-if="teamData.redTeam.players[1].qq !== ''" :src="`/api/QQAvatar?qq=${teamData.redTeam.players[1].qq}`" />
            </div>
            <img class="absolute left-0 top-0 h-full w-full" src="/img/选手头像边框.png" />
            <div class="relative -left-[12px] top-[82px] rotate-[30deg]">
              <img class="absolute left-0 top-0 h-[33px] w-[128px]" src="/img/选手名背景.png" />
              <div class="absolute h-full w-full text-center [line-height:33px]">
                <p class="font-bold text-red-team-color">{{ teamData.redTeam.players[1].name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="turn === -1 || !playing" class="absolute left-[337px] top-[236px] mx-auto h-[844px] w-[1250px] items-center z-10 p-2 pt-0 bg-white">
          <div v-show="ready" class="flex bg-zinc-700 rounded-b-xl h-full w-full flex-col items-center justify-center text-4xl text-white">
            <p v-show="ownTeam !== ''" class="pb-2 font-bold" :class="`text-${ownTeam}-team-color`">{{ checkTeam(ownTeam) }}</p>
            <p>{{ ownTeam !== "" ? "等待开始" : "链接无效" }}</p>
          </div>
        </div>

        <div v-else-if="turn >= 0 && turn < 2" class="absolute left-[337px] top-[236px] mx-auto h-[844px] w-[1250px] items-center bg-white z-10  p-2 pt-0">
          <div class="flex h-full w-full flex-col rounded-b-xl bg-zinc-700 p-4">
            <div class="flex h-14 w-full items-center justify-between rounded-lg bg-white">
              <div class="ml-4 text-2xl">禁用子职业</div>
              <div class="flex h-full items-center justify-end px-2 [border-left:1px_solid_#ccc]">
                <input v-model="search" placeholder="搜索..." type="text" class="h-full text-2xl outline-none" />
                <SearchOutlined class="px-2 text-3xl text-black" />
              </div>
            </div>
            <div class="mint-scroll w-full pt-6">
              <div class="h-[610px] overflow-y-auto rounded-lg bg-white px-6 py-4" style="overflow: visible">
                <div class="mx-auto flex flex-wrap gap-5 font-bold">
                  <div @click="selectBranch('无')" class="group relative cursor-pointer border-4 border-zinc-800 bg-white px-4 py-2 text-xl" :class="getPreSelect() === '无' ? (states[turn].team === 'blue' ? 'border-blue-team-color text-blue-team-color' : 'border-red-team-color text-red-team-color') : 'border-zinc-800'">无</div>
                  <div @click="selectBranch(branch.分支)" v-for="branch in samilarBranch" :class="getPreSelect() === branch.分支 ? (states[turn].team === 'blue' ? 'border-blue-team-color text-blue-team-color' : 'border-red-team-color text-red-team-color') : 'border-zinc-800'" class="group relative cursor-pointer border-4 bg-white px-4 py-2 text-xl">
                    {{ branch.分支 }}
                    <div class="absolute -bottom-[60px] left-0 z-40 hidden h-12 w-full justify-center bg-gray-500 group-hover:flex">
                      <div>
                        <div class="flex min-w-[400px] flex-col items-center border-2 border-gray-300 bg-white p-4 shadow-xl">
                          <p class="text-nowrap text-zinc-800">{{ branch.分支 }}</p>
                          <div class="mt-2 flex w-full flex-wrap gap-4">
                            <div v-for="operator in branch.包含干员" class="relative h-[60px] w-[60px] cursor-pointer bg-white shadow-inner">
                              <img :src="operator.头像" class="absolute" alt="" />
                              <div class="absolute h-full w-full select-none outline-[6px] outline-[#1c5be4]" :title="operator.干员" style="box-shadow: inset 0 0 7px 3px rgba(0, 0, 0, 1)"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center py-6 text-white">
              <button :disabled="getActiveTeam().preSelect === ''" @click="nextTurn()" :class="getActiveTeam().preSelect === '' ? 'cursor-not-allowed bg-zinc-400' : 'bg-[#faad14]'" class="rounded-lg px-8 py-4 text-3xl">确定</button>
            </div>
          </div>
        </div>

        <div v-else class="absolute left-[337px] top-[236px] z-10 mx-auto h-[844px] w-[1250px] items-center bg-white p-2 pt-0">
          <div class="flex h-full w-full flex-col rounded-b-xl bg-zinc-700 p-4">
            <div class="flex h-14 w-full justify-between bg-white">
              <ul class="flex h-full select-none items-center justify-start text-2xl">
                <li @click="selectedOperatorClass = '全部'" :class="{ 'text-[#faad14]': selectedOperatorClass === '全部' }" class="relative cursor-pointer px-4 [border-right:1px_solid_#ccc]">
                  全部
                  <div v-show="selectedOperatorClass === '全部'" class="angle-posi"></div>
                </li>
                <li :class="{ 'text-[#faad14]': selectedOperatorClass === operatorClass }" @click="selectedOperatorClass = operatorClass" class="relative cursor-pointer px-4 [border-right:1px_solid_#ccc]" v-for="operatorClass in operatorClasses">
                  {{ operatorClass }}
                  <div v-show="selectedOperatorClass === operatorClass" class="angle-posi"></div>
                </li>
              </ul>
              <div class="flex h-full select-none items-center justify-end">
                <a-config-provider
                  :theme="{
                    algorithm: theme.defaultAlgorithm,
                  }"
                >
                  <label class="flex cursor-pointer items-center gap-x-2"> <a-switch v-model:checked="hideDisabledOperator" /><span class="text-lg">隐藏被禁用干员</span> </label>
                </a-config-provider>
              </div>
              <div class="flex items-center justify-end px-2 [border-left:1px_solid_#ccc]">
                <input v-model="search" placeholder="搜索..." type="text" class="h-full w-[220px] text-2xl outline-none" />
                <SearchOutlined class="px-2 text-3xl text-black" />
              </div>
            </div>

            <div class="mint-scroll w-full pt-6">
              <div class="h-[610px] overflow-y-auto bg-white px-6 py-4">
                <div class="mx-auto flex flex-wrap gap-5">
                  <div @click="selectOperator('无')" :class="isAvailableOperator('无') ? 'cursor-pointer bg-white' : 'cursor-not-allowed bg-black bg-opacity-50 grayscale-[1]'" class="relative h-[96px] w-[96px] select-none shadow-inner">
                    <div class="absolute flex h-full w-full items-center justify-center">
                      <img src="/img/禁用图标_black.png" class="w-[78px]" />
                    </div>
                    <div class="absolute h-full w-full select-none outline-[6px]" title="无" :class="getPreSelect() === '无' ? (states[turn].team === 'blue' ? 'text-blue-team-color outline outline-blue-team-color' : 'text-red-team-color outline outline-red-team-color') : ''" style="box-shadow: inset 0 0 7px 3px rgba(0, 0, 0, 1)"></div>
                  </div>
                  <div v-show="isShowOperator(operator.干员)" :class="isAvailableOperator(operator.干员) ? 'cursor-pointer bg-white' : 'cursor-not-allowed bg-black bg-opacity-50 grayscale-[1]'" v-for="operator in samilarOperator" @click="selectOperator(operator.干员)" class="relative h-[96px] w-[96px] select-none shadow-inner">
                    <img :src="operator.头像" class="absolute" />
                    <div class="absolute h-full w-full select-none outline-[6px]" :title="operator.干员" :class="getPreSelect() === operator.干员 ? (states[turn].team === 'blue' ? 'text-blue-team-color outline outline-blue-team-color' : 'text-red-team-color outline outline-red-team-color') : ''" style="box-shadow: inset 0 0 7px 3px rgba(0, 0, 0, 1)"></div>
                    <div class="h-32px absolute bottom-0 right-0 flex w-[32px] items-center justify-center bg-primary text-xl font-bold text-white">{{ operator.稀有度 }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center mt-8 text-white">
              <button :disabled="getActiveTeam().preSelect === '' && states[turn].team === ownTeam" @click="nextTurn()" :class="getActiveTeam().preSelect === '' || states[turn].team !== ownTeam ? 'cursor-not-allowed bg-zinc-400' : 'bg-[#faad14]'" class="rounded-lg px-8 py-4 text-3xl">
                {{ states[turn].team === ownTeam ? "确定" : "等待对方选择" }}
              </button>
            </div>
          </div>
        </div>

        <div class="select-none">
          <img src="/img/蓝色选人背景.png" class="absolute bottom-0" alt="" />
          <div class="relative left-0 top-[166px]">
            <div class="absolute left-[13px] top-0 flex-row space-y-[6px] text-red-400">
              <div class="relative h-[160px] w-[177px]" v-for="index in [1, 3, 5, 7, 9]">
                <img class="absolute" src="/img/选人框箭头右-外阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#1c5be4]" style="mask: url(/img/选人框箭头右-渐变.png)"></div>
                <div class="absolute left-0 top-0 h-full w-full bg-white" style="mask: url(/img/选人框箭头右-遮罩.png)"></div>
                <p class="absolute -top-[40px] left-[10px] text-[120px] text-white [text-shadow:0_0_2px_black]">{{ index }}</p>
                <div v-if="turn >= 14" class="absolute left-0 top-0 z-10 h-full w-full" style="mask: url(/img/选人框箭头右-遮罩.png)">
                  <img :class="{ picked: teamData.blueTeam.pick[index - 1] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.blueTeam.pick[index - 1], 'blue')" />
                  <div class="absolute h-full w-full bg-black bg-opacity-25" v-if="states[turn].team === 'blue' && states[turn].order === index && !teamData.blueTeam.pick[index - 1]"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'blue' && states[turn].order === index && !teamData.blueTeam.pick[index - 1]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
                </div>

                <img class="absolute" src="/img/选人框箭头右-内阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#1c5be4]" style="mask: url(/img/选人框箭头右-描边.png)"></div>
              </div>
            </div>

            <div class="absolute left-[152px] top-[79px] flex-row space-y-[6px]">
              <div class="relative h-[160px] w-[177px]" v-for="index in [2, 4, 6, 8, 10]">
                <img class="absolute left-0" src="/img/选人框箭头左-外阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#1c5be4]" style="mask: url(/img/选人框箭头左-渐变.png)"></div>
                <div class="absolute left-0 top-0 h-full w-full bg-white" style="mask: url(/img/选人框箭头左-遮罩.png)"></div>
                <p class="absolute -top-[40px] right-[10px] text-[120px] text-white [text-shadow:0_0_2px_black]">{{ index }}</p>
                <div v-if="turn >= 14" class="absolute left-0 top-0 z-10 h-full w-full" style="mask: url(/img/选人框箭头左-遮罩.png)">
                  <img :class="{ picked: teamData.blueTeam.pick[index - 1] }" class="absolute left-[16px] h-full object-cover" :src="getOperatorHeadImage(teamData.blueTeam.pick[index - 1], 'blue')" />
                  <div class="absolute h-full w-full bg-black bg-opacity-25" v-if="states[turn].team === 'blue' && states[turn].order === index && !teamData.blueTeam.pick[index - 1]"></div>
                  <img class="breathing-light absolute left-[16px] h-full" v-if="states[turn].team === 'blue' && states[turn].order === index && !teamData.blueTeam.pick[index - 1]" :src="getOperatorHeadImage(teamData.blueTeam.preSelect, 'blue')" />
                </div>

                <img class="absolute" src="/img/选人框箭头左-内阴影.png" />
                <div class="z absolute left-0 top-0 z-10 h-full w-full bg-[#1c5be4]" style="mask: url(/img/选人框箭头左-描边.png)"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="select-none">
          <img src="/img/红色选人背景.png" class="absolute bottom-0 left-[1584px]" />
          <div class="relative left-[1584px] top-[166px]">
            <div class="absolute left-[13px] top-[84px] flex-row space-y-[6px]">
              <div class="relative h-[160px] w-[177px]" v-for="index in [2, 4, 6, 8, 10]">
                <img class="absolute" src="/img/选人框箭头右-外阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#e1331c]" style="mask: url(/img/选人框箭头右-渐变.png)"></div>
                <div class="absolute left-0 top-0 h-full w-full bg-white" style="mask: url(/img/选人框箭头右-遮罩.png)"></div>
                <p class="absolute -top-[40px] left-[10px] text-[120px] text-white [text-shadow:0_0_2px_black]">{{ index }}</p>

                <div v-if="turn >= 14" class="absolute left-0 top-0 z-10 h-full w-full" style="mask: url(/img/选人框箭头右-遮罩.png)">
                  <img :class="{ picked: teamData.redTeam.pick[index - 1] }" class="absolute h-full" :src="getOperatorHeadImage(teamData.redTeam.pick[index - 1], 'red')" />
                  <div class="absolute h-full w-full bg-black bg-opacity-25" v-if="states[turn].team === 'red' && states[turn].order === index && !teamData.redTeam.pick[index - 1]"></div>
                  <img class="breathing-light absolute h-full" v-if="states[turn].team === 'red' && states[turn].order === index && !teamData.redTeam.pick[index - 1]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <img class="absolute" src="/img/选人框箭头右-内阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#e1331c]" style="mask: url(/img/选人框箭头右-描边.png)"></div>
              </div>
            </div>
            <div class="absolute -top-[3px] left-[154px] flex-row space-y-[6px]">
              <div class="relative h-[160px] w-[177px]" v-for="index in [1, 3, 5, 7, 9]">
                <img class="absolute left-0" src="/img/选人框箭头左-外阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#e1331c]" style="mask: url(/img/选人框箭头左-渐变.png)"></div>
                <div class="absolute left-0 top-0 h-full w-full bg-white" style="mask: url(/img/选人框箭头左-遮罩.png)"></div>
                <p class="absolute -top-[40px] right-[10px] text-[120px] text-white [text-shadow:0_0_2px_black]">{{ index }}</p>
                <div v-if="turn >= 14" class="absolute left-0 top-0 z-10 h-full w-full" style="mask: url(/img/选人框箭头左-遮罩.png)">
                  <img :class="{ picked: teamData.redTeam.pick[index - 1] }" class="absolute left-[16px] h-full" :src="getOperatorHeadImage(teamData.redTeam.pick[index - 1], 'red')" />
                  <div class="absolute h-full w-full bg-black bg-opacity-25" v-if="states[turn].team === 'red' && states[turn].order === index && !teamData.redTeam.pick[index - 1]"></div>
                  <img class="breathing-light absolute left-[16px] h-full" v-if="states[turn].team === 'red' && states[turn].order === index && !teamData.redTeam.pick[index - 1]" :src="getOperatorHeadImage(teamData.redTeam.preSelect, 'red')" />
                </div>
                <img class="absolute" src="/img/选人框箭头左-内阴影.png" />
                <div class="absolute left-0 top-0 z-10 h-full w-full bg-[#e1331c]" style="mask: url(/img/选人框箭头左-描边.png)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center py-8">
    <button @click="fullScreenBPView()" class="z-50 cursor-pointer rounded-lg bg-primary px-8 py-4 text-3xl text-white">点击全屏</button>
  </div>
</template>

<script setup lang="ts">
import { pinyin } from "pinyin-pro";
import { theme } from "ant-design-vue";
import { io } from "socket.io-client";

const socket = io("/");
const progressKey = ref(1);
const { query } = useRoute();
const ready = ref(false);
socket.on("hello", function (data: any) {
  console.log(data);
});

let ownTeam = ref("");

const hideDisabledOperator = ref(false);

type Operator = {
  干员: string;
  职业: string;
  分支: string;
  稀有度: number;
  头像: string;
  关键词: string;
  图片: HTMLImageElement;
};
type Branch = {
  分支: string;
  所属职业: string;
  包含干员: Operator[];
  关键词: string;
  图片: HTMLImageElement;
};
type TeamData = {
  name: string;
  players: { qq: string; name: string }[];
  ban: string[];
  pick: string[];
  preSelect: string;
};
type TeamName = "blueTeam" | "redTeam";

const bp_view = ref<HTMLDivElement | null>();

const turn = ref(-1);
const pausing = ref(false);

const teamData = ref<{
  [key in TeamName]: TeamData;
}>({
  blueTeam: {
    name: "",
    players: [
      {
        name: "",
        qq: "",
      },
      {
        name: "",
        qq: "",
      },
    ],
    ban: [],
    pick: [],
    preSelect: "",
  },
  redTeam: {
    name: "",
    players: [
      {
        name: "",
        qq: "",
      },
      {
        name: "",
        qq: "",
      },
    ],
    ban: [],
    pick: [],
    preSelect: "",
  },
});
type States = {
  turn: number;
  target: string;
  action: string;
  team: string;
  order: number;
};

let operators: Operator[] = await $fetch("/data/operators.json", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  parseResponse: JSON.parse,
});

let states: States[] = await $fetch("/api/GetCompetitionStates", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  parseResponse: JSON.parse,
});

let branches: Branch[] = await $fetch("/data/branches.json", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  parseResponse: JSON.parse,
});

socket.on("CheckCidResult", function (result: any) {
  if (result !== "未找到") {
    ownTeam.value = result;
  } else {
    ownTeam.value = "";
    turn.value = -1;
  }
  ready.value = true;
});
const playing = ref(false);
let extraBans: string[] = [];

socket.on("NextTurn", function (data: any) {
  playing.value = data.playing;
  turn.value = data.turn;
  pausing.value = data.pausing;
  teamData.value = data.teamData;
  extraBans = data.extraBans;
});

function progressSelector() {
  if (pausing.value) {
    return "pause-progress";
  }

  return states[turn.value].team === "blue" ? "blue-progress" : "red-progress";
}

function isDone() {
  let lastState = states[states.length - 1];
  if (lastState.team === "blue" && teamData.value.blueTeam.pick[9]) {
    return true;
  }
  if (lastState.team === "red" && teamData.value.redTeam.pick[9]) {
    return true;
  }
  return false;
}

function nextTurn() {
  if (isDone()) return;

  const state = states[turn.value];
  const { team, action } = state;
  if (team !== ownTeam.value) return;
  const targetTeam = ownTeam.value === "blue" ? teamData.value.blueTeam : teamData.value.redTeam;
  socket.emit("SubmitTurn", {
    turn: turn.value,
    preSelect: targetTeam.preSelect,
  });
}

function getActiveTeam() {
  const state = states[turn.value];

  const { team, action } = state;

  const targetTeam = team === "blue" ? teamData.value.blueTeam : teamData.value.redTeam;
  return targetTeam;
}

branches = branches.map((branch) => {
  branch["包含干员"] = operators.filter((operator) => operator.分支 === branch.分支);
  let keyword = `${branch.分支}|${branch.所属职业}|${branch["包含干员"].map((b) => b.干员).join("|")}`;
  branch["关键词"] = keywordGenerator(keyword);
  branch["图片"] = new Image();
  branch["图片"].src = `/img/分支/${branch.分支}.png`;
  return branch;
});
function isShowOperator(operatorName: string) {
  if (!hideDisabledOperator.value) return true;

  if (isAvailableOperator(operatorName)) {
    return true;
  } else {
    return false;
  }
}

function isAvailableOperator(operatorName: string) {
  if (operatorName === "无") {
    return true;
  }
  let unavailableOperators = [];
  let blueTeamBannedBranch = branches.find((branch) => branch.分支 === teamData.value.blueTeam.ban[0]);
  let redTeamBannedBranch = branches.find((branch) => branch.分支 === teamData.value.redTeam.ban[0]);

  let selectedOperators = [...teamData.value.blueTeam.pick, ...teamData.value.redTeam.pick];
  let bannedOperators = [...teamData.value.blueTeam.ban.slice(1, 7), ...teamData.value.redTeam.ban.slice(1, 7), ...extraBans];
  if (blueTeamBannedBranch) {
    bannedOperators.push(...blueTeamBannedBranch.包含干员.map((operator) => operator.干员));
  }
  if (redTeamBannedBranch) {
    bannedOperators.push(...redTeamBannedBranch.包含干员.map((operator) => operator.干员));
  }

  unavailableOperators.push(...selectedOperators, ...bannedOperators);

  return !unavailableOperators.includes(operatorName);
}

operators = operators
  .map((operator) => {
    operator["关键词"] = keywordGenerator(operator["干员"]);
    operator["头像"] = `/img/干员头像/${operator["干员"]}.png`;
    operator["图片"] = new Image();
    operator["图片"].src = operator["头像"];

    return operator;
  })
  .sort((a, b) => b.稀有度 - a.稀有度);

function keywordGenerator(value: string): string {
  return `${value}|${pinyin(value.replace("·", ""), { toneType: "none", type: "array" }).join("")}|${pinyin(value.replace("·", ""), { pattern: "first", toneType: "none", type: "array" }).join("")}`;
}

let operatorClasses = ["先锋", "近卫", "狙击", "重装", "医疗", "辅助", "术师", "特种"];

const search = ref("");
const selectedOperatorClass = ref("全部");

function selectOperator(operator: string): void {
  if (!isAvailableOperator(operator)) {
    return;
  }
  if (isDone()) return;
  const state = states[turn.value];
  if (state.team !== ownTeam.value) return;
  if (ownTeam.value === "blue") {
    socket.emit("UpdatePreSelect", operator);
  } else if (ownTeam.value === "red") {
    socket.emit("UpdatePreSelect", operator);
  }
}

socket.on("UpdatePreSelect", function (data) {
  if (isDone()) return;
  const targetTeam = data.team === "blue" ? teamData.value.blueTeam : teamData.value.redTeam;
  targetTeam.preSelect = data.preSelect;
});

socket.on("CheckCid", function (data) {
  socket.emit("CheckCid", query.cid);
});

function getPreSelect() {
  if (turn.value === -1) return "";

  const state = states[turn.value];
  if (state.team !== ownTeam.value) return "";
  if (state.team === "blue") {
    return teamData.value.blueTeam.preSelect;
  } else if (state.team === "red") {
    return teamData.value.redTeam.preSelect;
  } else {
    return "";
  }
}

function selectBranch(branch: string): void {
  const state = states[turn.value];
  if (state.team !== ownTeam.value) return;
  if (state.team === "blue") {
    teamData.value.blueTeam.preSelect = branch;
    socket.emit("UpdatePreSelect", branch);
  } else {
    teamData.value.redTeam.preSelect = branch;
    socket.emit("UpdatePreSelect", branch);
  }
}

function checkTeam(val: string) {
  if (val === "blue") {
    return "蓝色方";
  } else if ((val = "red")) {
    return "红色方";
  }
  return "";
}

function getOperatorHeadImage(operatorName: string, team: string) {
  if (operatorName === "无") {
    return team === "blue" ? "/img/禁用箭头_blue.png" : "/img/禁用箭头_red.png";
  }
  let find = operators.find((operator) => operator.干员 === operatorName);
  return find ? find.头像 : "";
}

function getBranchImage(branchName: string, team: string) {
  if (branchName === "无") {
    return team === "blue" ? "/img/禁用箭头_blue.png" : "/img/禁用箭头_red.png";
  }
  return branchName ? `/img/分支/${branchName}.png` : "";
}

const samilarOperator = computed(() => {
  return operators.filter((d) => {
    const matchesSearch = d.关键词.includes(search.value);
    const matchesClass = selectedOperatorClass.value === "全部" || d.职业 === selectedOperatorClass.value;
    return matchesSearch && matchesClass;
  });
});

const samilarBranch = computed(() => {
  return branches.filter((branch) => {
    const matchesSearch = branch.关键词.includes(search.value);

    return matchesSearch;
  });
});

const bpViewData = reactive({
  scale: 1,
  width: 1920,
  height: 1080,
});

function fullScreenBPView() {
  if (bp_view.value) {
    if (bp_view.value.requestFullscreen) {
      bp_view.value.requestFullscreen();
      updateView();
    }
  }
}

function isFullscreen() {
  return !!document.fullscreenElement;
}

onMounted(async () => {
  updateView();
  window.addEventListener("resize", updateView);

  socket.emit("CheckCid", query.cid);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateView);
});

function updateView() {
  if (isFullscreen()) {
    let scale = window.innerWidth / 1920;
    bpViewData.scale = scale;
    bpViewData.width = 1920 * scale;
    bpViewData.height = 1080 * scale;
  } else {
    let scale = 1000 / 1920;

    bpViewData.scale = scale;
    bpViewData.width = 1920 * scale;
    bpViewData.height = 1080 * scale;
  }
}
socket.on("timer", function (timestamp) {
  const newTimestamp = timestamp + 120 * 1000;
  const currentTime = Date.now();

  const progressPercent = ((newTimestamp - currentTime) / (newTimestamp - timestamp)) * 100;
  const clampedProgress = Math.max(0, Math.min(100, progressPercent));
  const remainingTimeMs = newTimestamp - currentTime;
  const remainingTimeMin = Math.max(0, remainingTimeMs / 1000);
  progressKey.value++;
  if (document) {
    document.documentElement.style.setProperty("--progress-start", `${clampedProgress}%`);
    document.documentElement.style.setProperty("--countdown-duration", `${remainingTimeMin}s`);
  }
});

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState !== "hidden") {
    socket.emit("CheckCid", query.cid);
  }
});


</script>