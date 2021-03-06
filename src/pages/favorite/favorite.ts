import { Global } from './../../app/model/global';
import { LatestSubPage } from './../latest-sub/latest-sub';
import { PostwantedthingPage } from './../postwantedthing/postwantedthing';
import { ActionSheetController } from 'ionic-angular';
import { PostDataModel } from './../../app/model/PostDataModel';
import { Service } from './../../providers/service';
import { MyDataModel } from './../../app/model/DataModel';
import { ServerDataModel, ServerDataModelDelegate } from './../../app/model/ServerDataModel-helper';
import { PostPage } from './../post/post';
import { LoginPage } from './../login/login';
import { WantedthingPage } from './../wantedpage/wantedpage';
import { MynotificationPage } from './../notification/notification';
import { MyprofilePage } from './../myprofile/myprofile';
import { Component } from '@angular/core';
import { SearchPage } from './../search/search';
import {MorePage} from '../more/more';
import { NavController, NavParams, Events } from 'ionic-angular';
import * as $ from 'jquery';

/*
  Generated class for the Latest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
   providers : [Service,ServerDataModel]
})
export class FavoritePage implements ServerDataModelDelegate {


///////////////////////server data//////////////
  serverData : any ;
  keys : Array<MyDataModel> = [];
  temp : any;
  /////////////////////////////
  public  postsDataArray : Array<PostDataModel> = new Array<PostDataModel>();

    public flag: any;
    public badge = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams,public datamodel:ServerDataModel, private ev: Events) {

     this.navCtrl = navCtrl;

    this.flag = Global.flag;
    this.badge = Global.badge;
    
    this.ev.subscribe('badge', (badge)=>{
      this.badge = badge;
      console.log("event : ", badge);
    })
    
  }

  gotonotification() {
    this.navCtrl.push(MynotificationPage);
  }
  gotoprofile() {
    this.navCtrl.push(MorePage);
  }
  gotosearch(){
    this.navCtrl.push(SearchPage,{});
  }
  
 ionViewWillEnter()
 {
    if(Global.Static_profile_id == "") {
      $('.fstatusbar img').css('display', 'none');
    }
     this.datamodel.GetFavoritePosts();
     this.datamodel.homedelegate = this;
 }

  onPageDidEnter() {
    //   this.datamodel.GetPostProducts();
    //  this.datamodel.homedelegate = this;
  }

   dataSourceUpdated(data)
  {
    console.log(data);
      this.keys = [];
     // console.log("delegatedata ==>",data)
      this.postsDataArray = data;
      // this.postsDataArray = new Array<PostDataModel>();
      for (let index in this.postsDataArray)
    {

      this.temp = this.postsDataArray[index];

       this.keys.push(this.temp);
    }
    // console.log("temp====>",this.keys)
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestPage');
  }

  click_card(i)
  {
      var send_array = this.postsDataArray[i]; 
      var send_content = send_array["post_content"];
      var send_price   = send_array["post_price"];
      var send_title   = send_array["post_title"];
      var send_img_url = send_array["post_img_url"];
      var send_date    = send_array["post_date"];
      var send_desc    = send_array["post_content"];
      var send_profile_id    = send_array["post_profile_id"];
      var send_viewcount    = send_array["post_viewcount"];
      var send_id    = send_array["post_id"];
      var send_wanted    = send_array["wanted"];
      var send_category_id    = send_array["post_category_id"];
      var send_islike    = send_array["islike"];
      var send_isfollow    = send_array["post_profile_isfollow"];

      if(send_wanted == '1') {
        this.navCtrl.push(WantedthingPage,{
         content:send_content,
         price:send_price,
         title:send_title,
         img_url:send_img_url,
         date:send_date,
         desc:send_desc,
         views:send_viewcount,
         id:send_id,
         wanted:send_wanted,
         category_id:send_category_id,
         profile_id: send_profile_id
       });
      } else {
       this.navCtrl.push(LatestSubPage,{
         content:send_content,
         price:send_price,
         title:send_title,
         img_url:send_img_url,
         date:send_date,
         desc:send_desc,
         views:send_viewcount,
         id:send_id,
         wanted:send_wanted,
         category_id:send_category_id,
         islike:send_islike,
         profile_id: send_profile_id,
         isfollow: send_isfollow
       });
      }
  }
}
