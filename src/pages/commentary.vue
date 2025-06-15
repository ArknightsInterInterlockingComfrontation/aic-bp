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
              <img v-show="getBranchImage(teamData.redTeam.preSelect, 'red') !== ''" class="breathing-light absolute h-full w-full  object-contain" v-if="states[turn].team === 'red' && states[turn].action === 'ban' && states[turn].order === 0 && !teamData.redTeam.ban[0]" :src="getBranchImage(teamData.redTeam.preSelect, 'red')" />
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
            <div class="grid grid-cols-2 gap-x-12">
              <div class="space-y-4">
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">蓝色方选手1</span>
                  <a-input v-model:value="playersForm.blueTeamPlayers[0].name" size="large" />
                </div>
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">蓝色方选手1 QQ号</span>
                  <a-input v-model:value="playersForm.blueTeamPlayers[0].qq" size="large" />
                </div>
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">蓝色方选手2</span>
                  <a-input v-model:value="playersForm.blueTeamPlayers[1].name" size="large" />
                </div>
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">蓝色方选手2 QQ号</span>
                  <a-input size="large" v-model:value="playersForm.blueTeamPlayers[1].qq" />
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">红色方选手1</span>
                  <a-input v-model:value="playersForm.redTeamPlayers[0].name" size="large" />
                </div>
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">红色方选手1 QQ号</span>
                  <a-input v-model:value="playersForm.redTeamPlayers[0].qq" size="large" />
                </div>
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">红色方选手2</span>
                  <a-input v-model:value="playersForm.redTeamPlayers[1].name" size="large" />
                </div>
                <div class="flex flex-col gap-y-1 text-white">
                  <span class="text-nowrap">红色方选手2 QQ号</span>
                  <a-input v-model:value="playersForm.redTeamPlayers[1].qq" size="large" />
                </div>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-[minmax(min-content,max-content),auto] gap-x-4">
              <div class="flex flex-col gap-y-1 text-white">
                <span class="text-nowrap">先手方</span>
                <a-select v-model:value="first" size="large" style="width: 200px" :options="statesOptions"></a-select>
              </div>
              <div class="flex w-full flex-col gap-y-1 text-white">
                <span class="text-nowrap">手动数据</span>
                <a-textarea v-model:value="customData" size="large"></a-textarea>
              </div>
            </div>

            <div class="mt-8 flex justify-center">
              <a-button size="large" type="primary" @click="generateNewCompetition()">点击生成对局</a-button>
            </div>

            <div class="mt-2 space-y-4 text-white">
              <div class="flex flex-col gap-y-2">
                <div class="text-nowrap">蓝色方队伍</div>
                <div class="flex h-10 w-full items-center">
                  <div class="flex h-full w-full items-center bg-blue-team-color px-4">
                    {{ playerUrls.blue }}
                  </div>
                  <button class="ml-4 h-full text-nowrap rounded-sm bg-primary px-6 py-2" @click="copyText(playerUrls.blue)">点击复制</button>
                </div>
              </div>
              <div class="flex flex-col gap-y-2">
                <span class="text-nowrap">红色方队伍</span>
                <div class="flex h-10 w-full items-center">
                  <div class="flex h-full w-full items-center bg-red-team-color px-4">
                    {{ playerUrls.red }}
                  </div>
                  <button class="ml-4 h-full text-nowrap rounded-sm bg-primary px-6 py-2" @click="copyText(playerUrls.red)">点击复制</button>
                </div>
              </div>
            </div>
            <div class="mt-12 flex justify-center text-white">
              <button class="h-[64px] w-full rounded-lg bg-primary text-xl font-bold" @click="startCompetition()">开始对局</button>
            </div>
          </div>
        </div>

        <div v-else class="absolute left-[337px] top-[236px] z-40 mx-auto h-[844px] w-[1250px] items-center bg-white p-2 pt-0">
          <div class="flex h-full w-full items-center justify-center rounded-b-xl bg-zinc-700 p-4">
            <div class="mint-scroll flex w-[800px] flex-col text-white">
              <span class="h-[600px] overflow-y-auto whitespace-pre-wrap text-wrap rounded-xl bg-zinc-900 p-4">
                {{ realData }}
              </span>
              <div class="mt-4 flex justify-center gap-x-4">
                <button class="h-[64px] rounded-lg bg-white px-4 text-xl font-bold text-primary" @click="setCompetitionPauseState()">{{ pausing ? "结束暂停" : "暂停对局" }}</button>
                <button class="h-[64px] rounded-lg bg-primary px-4 text-xl text-white" @click="stopCompetition()">结束对局</button>
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
import { io } from "socket.io-client";

const socket = io("/");

const pausing = ref(false);

const playing = ref(false);

const progressKey = ref(1);

const first = ref("blue");
const customData = ref("");
const statesOptions = reactive([
  {
    label: "蓝色方",
    value: "blue",
  },
  {
    label: "红色方",
    value: "red",
  },
]);

socket.on("hello", function (data: any) {
  console.log(data);
});

let ownTeam = ref("");

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

socket.on("CheckCidResult", function (result: any) {
  if (result !== "未找到") {
    ownTeam.value = result;
  }
});

const playersForm = ref({
  blueTeamPlayers: [
    { name: "", qq: "" },
    { name: "", qq: "" },
  ],
  redTeamPlayers: [
    { name: "", qq: "" },
    { name: "", qq: "" },
  ],
});

async function generateNewCompetition() {
  let result = (await $fetch(`/api/GenerateCompetition`, {
    method: "POST",
    body: JSON.stringify({
      ...playersForm.value,
      first: first.value,
      customData: customData.value,
    }),
  })) as any;
  states = (await $fetch("/api/GetCompetitionStates", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    parseResponse: JSON.parse,
  })) as States[];
  if (result.blueTeamCompetitionId && result.redTeamCompetitionId) {
    playerUrls.value.blue = `${window.location.host}/player?cid=${result.blueTeamCompetitionId}`;
    playerUrls.value.red = `${window.location.host}/player?cid=${result.redTeamCompetitionId}`;
  }
}

async function stopCompetition() {
  let result = (await $fetch(`/api/GenerateCompetition`, {
    method: "POST",
    body: JSON.stringify({
      ...playersForm.value,
      first: first.value,
      customData: "",
    }),
  })) as any;
  states = (await $fetch("/api/GetCompetitionStates", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    parseResponse: JSON.parse,
  })) as States[];
  if (result.blueTeamCompetitionId && result.redTeamCompetitionId) {
    playerUrls.value.blue = `${window.location.host}/player?cid=${result.blueTeamCompetitionId}`;
    playerUrls.value.red = `${window.location.host}/player?cid=${result.redTeamCompetitionId}`;
  }
}

async function setCompetitionPauseState() {
  let result = (await $fetch(`/api/SetCompetitionPauseState`, {
    method: "POST",
    body: JSON.stringify({
      pausing: !pausing.value,
    }),
  })) as any;
  //pausing.value = !pausing.value;
}
function copyText(text: string) {
  try {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("复制成功");
      })
      .catch((err) => {
        message.error("复制失败");
      });
  } catch (err) {
    message.error(`非安全域名下无法复制，请手动复制：${text}`);
  }
}

socket.on("CheckCid", function () {
  socket.emit("CheckCid", "commentary");
});

const realData = ref("");
let extraBans: string[] = [];

socket.on("NextTurn", function (data: any) {
  playing.value = data.playing;
  turn.value = data.turn;
  pausing.value = data.pausing;
  teamData.value = data.teamData;
  extraBans = data.extraBans;

  realData.value = JSON.stringify(
    {
      turn: turn.value,
      pausing: pausing.value,
      teamData: {
        blueTeam: {
          ban: teamData.value.blueTeam.ban,
          pick: teamData.value.blueTeam.pick,
        },
        redTeam: {
          ban: teamData.value.redTeam.ban,
          pick: teamData.value.redTeam.pick,
        },
      },
      extraBans: extraBans,
    },
    null,
    "\t",
  );
});

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

const playerUrls = ref({
  blue: "",
  red: "",
});

socket.on("UpdatePreSelect", function (data) {
  if (teamData.value.blueTeam.pick[9]) return;
  const targetTeam = data.team === "blue" ? teamData.value.blueTeam : teamData.value.redTeam;
  targetTeam.preSelect = data.preSelect;
});

function getPreSelect() {
  if (turn.value === -1) return "";

  const state = states[turn.value];
  //if (state.team !== ownTeam.value) return "";
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

async function startCompetition() {
  await $fetch(`/api/StartCompetition`, {
    parseResponse: JSON.parse,
    query: {
      cid: "commentary",
    },
  });
}

async function getCompetitionId() {
  let result = (await $fetch(`/api/GetCompetitionId`, {
    parseResponse: JSON.parse,
    query: {
      cid: "commentary",
    },
  })) as any;
  if (result !== "err") {
    playerUrls.value.blue = `${window.location.host}/player?cid=${result.blueTeamCompetitionId}`;
    playerUrls.value.red = `${window.location.host}/player?cid=${result.redTeamCompetitionId}`;
  }
}

function isFullscreen() {
  return !!document.fullscreenElement;
}

socket.on("CheckCid", function (data) {
  socket.emit("CheckCid", "commentary");
});

onMounted(async () => {
  updateView();
  window.addEventListener("resize", updateView);
  getCompetitionId();
  socket.emit("CheckCid", "commentary");
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
    //用户回到当前页面
    socket.emit("CheckCid", "commentary");
  }
});
</script>