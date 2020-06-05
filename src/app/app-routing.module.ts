import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { ArticleComponent } from './components/article/article.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'profile/:username',
        component: ProfileComponent,
    },
    {
        path: 'profile/:username/favorites',
        component: ProfileComponent
    },
    {
        path: 'editor',
        component: EditorComponent
    }, {
        path: 'editor/:slug',
        component: EditorComponent
    },
    {
        path: 'article/:slug',
        component: ArticleComponent
    },
    {
        path: 'login',
        component: SignInComponent
    },
    {
        path: 'register',
        component: SignUpComponent
    },
    {
        path: 'setting',
        component: SettingComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
