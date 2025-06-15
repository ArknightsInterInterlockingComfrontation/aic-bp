<template>
  <div ref="bp_view" class="absolute flex h-full w-full items-center justify-center">
    <div :style="{ width: `${bpViewData.width}px`, height: `${bpViewData.height}px` }">
      <div :style="{ scale: bpViewData.scale }" class="h-[1080px] w-[1920px] origin-top-left overflow-hidden bg-[#3f3f46]">
        <div v-show="pausing" class="absolute left-0 top-0 z-30 flex h-full w-full items-start justify-center bg-black bg-opacity-75">
          <h1 class="mt-[100px] text-5xl font-bold text-white">暂停中...</h1>
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

        <div class="absolute top-[148px] z-20 flex w-full select-none justify-center" style="mask: url(/img/进度条.png); mask-repeat: no-repeat">
          <div :key="progressKey" v-if="turn >= 0 && !isDone()" :class="progressSelector()" class="h-[100px]"></div>
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

        <div v-if="turn === -1 || !playing" class="absolute left-[337px] top-[236px] z-10 mx-auto h-[844px] w-[1250px] items-center bg-white p-2 pt-0">
          <div class="h-full w-full rounded-b-xl bg-zinc-700 p-4">
            <div class="mt-4">
              <div class="flex w-full flex-col gap-y-1 text-white">
                <span class="text-nowrap">手动数据</span>
                <a-textarea :rows="20" v-model:value="customData" size="large"></a-textarea>
              </div>
            </div>

            <div class="mt-12 flex justify-center text-white">
              <button class="h-[64px] w-full rounded-lg bg-primary text-xl font-bold" @click="enterReplay()">开始播放</button>
            </div>
          </div>
        </div>

        <div v-else class="absolute left-[337px] top-[236px] z-40 mx-auto grid h-[844px] w-[1250px] grid-rows-[minmax(min-content,max-content),auto] items-center gap-y-[4px] bg-white p-2 pt-0">
          <div class="flex aspect-video w-full items-center justify-center overflow-hidden rounded-b-xl bg-zinc-700">
            <video ref="defaultPVVideo" v-show="videoSelector === 'default'" :src="defaultPV" class="h-full w-full object-cover" loop muted></video>
            <video ref="operatorPVVideo" @ended="operatorVideoEnded()" v-show="videoSelector === 'operator'" :src="operatorPV" class="h-full w-full object-cover" autoplay :muted="mute"></video>
          </div>
          <div class="mt-2 flex h-full w-full select-none items-center justify-center pb-[4px]">
            <div class="h-full w-full rounded-xl bg-zinc-700">
              <div class="mt-8 px-4">
                <div class="relative h-1 w-full rounded-full" style="background-color: #f5f7ff">
                  <div class="progress-bg absolute h-full rounded-full" :style="{ width: `${tickProcess}%` }"></div>
                  <input v-model="currentTick" @pointerdown="tickDraging = true" @touchend="jumpTick" @pointerup="jumpTick" class="absolute z-20 h-1 w-full cursor-pointer rounded-full" type="range" min="0" :max="tickCount" step="1" />
                </div>
              </div>

              <div class="mt-4 flex h-[48px] justify-between gap-x-4 px-4 text-white">
                <div class="flex h-full items-center justify-center gap-x-2 text-nowrap text-5xl">
                  <div class="cursor-pointer" @click="setReplayState()">
                    <PauseCircleOutlined v-show="replaying" />
                    <PlayCircleOutlined v-show="!replaying" />
                  </div>
                  <div class="text-gray-999 flex justify-around text-2xl text-white">
                    <div>{{ currentTick }}<span class="px-1">/</span>{{ tickCount }}</div>
                  </div>
                </div>

                <div class="flex h-full items-center justify-center gap-x-4 text-nowrap">
                  <a-checkbox size="large" v-model:checked="mute">静音</a-checkbox>
                  <a-button @click="exitReplay()" size="large">退出回放</a-button>
                </div>
              </div>
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
import { TaskTimer } from "tasktimer";
import { PauseCircleOutlined } from "@ant-design/icons-vue";

const timer = new TaskTimer(100);
const mute = ref(false);

const tickDraging = ref(false);
const tickCount = ref(0);
const tickProcess = ref(0);

function jumpTick(): void {
  tickDraging.value = false;
  tickProcess.value = (currentTick.value / tickCount.value) * 100;
  changeTick(currentTick.value);
}
const pausing = ref(false);

const playing = ref(false);

const progressKey = ref(1);
const customData = ref("");

const defaultPV = ref("/pv.mp4");
const operatorPV = ref("");

const defaultPVVideo = ref<HTMLVideoElement | null>(null);
const operatorPVVideo = ref<HTMLVideoElement | null>(null);

const videoSelector = ref("default");
const replaying = ref(false);

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

function setReplayState() {
  replaying.value = !replaying.value;
  progressKey.value++;
  refreshVideoState();
}

function refreshVideoState() {
  if (replaying.value && !pausing.value) {
    if (videoSelector.value === "operator") {
      if (operatorPVVideo.value) {
        operatorPVVideo.value.play();
      }
    } else {
      if (defaultPVVideo.value) {
        defaultPVVideo.value.play();
      }
    }
  } else {
    if (videoSelector.value === "operator") {
      if (operatorPVVideo.value) {
        operatorPVVideo.value.pause();
      }
    } else {
      if (defaultPVVideo.value) {
        defaultPVVideo.value.pause();
      }
    }
  }
}

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

type RawReplay = {
  order: number;
  timeline: number;
  team: string;
  action: string;
  value: string;
  turn: number;
};

type Replay = {
  order: number;
  tick: number;
  team: string;
  action: string;
  value: string;
  turn: number;
};

function progressSelector() {
  if (pausing.value) {
    return "pause-progress";
  }

  return states[turn.value].team === "blue" ? "blue-progress" : "red-progress";
}

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

let extraBans: string[] = [];

branches = branches.map((branch) => {
  branch["包含干员"] = operators.filter((operator) => operator.分支 === branch.分支);
  let keyword = `${branch.分支}|${branch.所属职业}|${branch["包含干员"].map((b) => b.干员).join("|")}`;
  branch["关键词"] = keywordGenerator(keyword);
  branch["图片"] = new Image();
  branch["图片"].src = `/img/分支/${branch.分支}.png`;

  return branch;
});

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

const currentTick = ref(0);
let replay: Replay[] = [];

function getPreSelect() {
  if (turn.value === -1) return "";

  const state = states[turn.value];
  if (state.team === "blue") {
    return teamData.value.blueTeam.preSelect;
  } else {
    return teamData.value.redTeam.preSelect;
  }
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

function operatorVideoEnded() {
  videoSelector.value = "default";
  if (defaultPVVideo.value) {
    defaultPVVideo.value.play();
  }
}

onMounted(async () => {
  updateView();
  document.documentElement.style.setProperty("--progress-start", `100%`);
  document.documentElement.style.setProperty("--countdown-duration", `120s`);
  window.addEventListener("resize", updateView);
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

let replayIndex = 0;

function getTicks(actions: RawReplay[]): Replay[] {
  const usedTimelines = new Set();
  const result = actions.map((item) => {
    let newTimeline = Math.ceil(item.timeline / 100);
    while (usedTimelines.has(newTimeline)) {
      newTimeline++;
    }
    usedTimelines.add(newTimeline);
    return {
      ...item,
      tick: newTimeline,
    };
  });
  return result;
}
let lastState = states[states.length - 1];
function initCompetition(data: any) {
  replay = getTicks(data.replay);
  playing.value = true;
  pausing.value = data.pausing;
  teamData.value = JSON.parse(JSON.stringify(data.teamData));
  extraBans = data.extraBans;
  lastState = states[states.length - 1];

  tickCount.value = replay[replay.length - 1].tick;
  states = data.states;
}

function enterReplay() {
  try {
    replayIndex = 1;
    currentTick.value = 0;
    initCompetition(JSON.parse(customData.value));
    if (defaultPVVideo.value) {
      defaultPVVideo.value.currentTime = 0;
      defaultPVVideo.value.pause();
    }

    if (replay[0].action === "start") {
      turn.value = replay[0].turn;
      playing.value = true;
      replaying.value = false;
      videoSelector.value = "default";
    }

    timer.start();
  } catch {
    message.warning("未成功识别数据，请检查数据格式是否正确");
  }
}

function exitReplay() {
  replayIndex = 0;
  replaying.value = false;
  playing.value = false;
  pausing.value = false
  turn.value = -1;
  timer.stop();
}

function changeTick(val: number) {
  timer.stop();
  replaying.value = true;
  initCompetition(JSON.parse(customData.value));
  let closestTickIndex = findClosestTickIndex(replay, val) ?? 1;

  operatorVideoEnded();

  for (let i = 0; i < closestTickIndex + 1; i++) {
    playNextTick(replay[i]);
  }
  replayIndex = closestTickIndex + 1;
  timer.start();
}

function findClosestTickIndex(replay: Replay[], targetTick: number) {
  if (!replay || replay.length === 0) {
    return null;
  }
  const { closestIndex } = replay.reduce(
    (acc, current, index) => {
      if (current.tick <= targetTick) {
        const currentDiff = Math.abs(current.tick - targetTick);
        const closestDiff = Math.abs(acc.closest.tick - targetTick);

        if (currentDiff < closestDiff) {
          acc.closest = current;
          acc.closestIndex = index;
        }
      }
      return acc;
    },
    { closest: { tick: -Infinity }, closestIndex: -1 },
  );
  return closestIndex === -1 ? null : closestIndex;
}

timer.on("tick", () => {
  tickProcess.value = (currentTick.value / tickCount.value) * 100;
  if (tickDraging.value || !replaying.value) {
    return;
  }
  if (replayIndex >= replay.length) {
    return;
  }

  let targetReplay = replay[replayIndex];
  if (currentTick.value === targetReplay.tick) {
    playNextTick(targetReplay);
    replayIndex++;

    // if (replayIndex < replay.length) {
    //   console.log(`当前tick:${targetReplay.tick},下一个行动会在 ${replay[replayIndex].tick} tick进行，${JSON.stringify(replay[replayIndex])}`);
    // }
  }

  if (currentTick.value >= tickCount.value) {
    timer.stop();
    return;
  }

  if (currentTick.value < tickCount.value) {
    currentTick.value++;
  }
});

function playNextTick(replay: Replay) {
  const targetTeam = replay.team === "blue" ? teamData.value.blueTeam : teamData.value.redTeam;

  if (replay.action === "preSelect") {
    targetTeam.preSelect = replay.value;
  }
  if (replay.action === "ban") {
    if (targetTeam.ban.length > 0) {
      videoSelector.value = "operator";
      replaying.value = true;
    }
    targetTeam.ban.push(replay.value);
    targetTeam.preSelect = "";
    operatorPV.value = `/pv/${replay.value}.mp4`;
    turn.value++;

    progressKey.value++;
  }
  if (replay.action === "pick") {
    targetTeam.pick.push(replay.value);
    targetTeam.preSelect = "";
    operatorPV.value = `/pv/${replay.value}.mp4`;
    if (turn.value < states.length - 1) {
      turn.value++;
    }
    if (defaultPVVideo.value) {
      defaultPVVideo.value.pause();
    }
    progressKey.value++;
    videoSelector.value = "operator";
    replaying.value = true;
  }
  if (replay.action === "start") {
    turn.value = replay.turn;
    playing.value = true;
    videoSelector.value = "default";
    progressKey.value++;
  }
  if (replay.action === "pause") {
    pausing.value = replay.value as unknown as boolean;
    refreshVideoState();
  }
  refreshVideoState();
}

</script>

<style scoped>
.progress-bg {
  background: var(--primary-color);
}

.audio-thumb {
  border-color: #ccd5ff;
  bottom: -6px;
  border-width: 3px;
  background-color: var(--primary-color);
}

input[type="range"] {
  appearance: none;
  -webkit-appearance: none;
  background: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  background-color: var(--primary-color);
  border-radius: 50%;
  border: 3px solid #ccd5ff;
}
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  background-color: var(--primary-color);
  border-radius: 50%;
  border: 3px solid #ccd5ff;
}
input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  background-color: var(--primary-color);
  border-radius: 50%;
  border: 3px solid #ccd5ff;
}
</style>
