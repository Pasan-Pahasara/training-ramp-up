import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/theme/primary_theme.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_view.dart';
import 'package:front_end/ui/user_home_page/user_home_page_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../sign_in_page/sign_in_page_bloc.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({
    super.key,
    required this.isAuthenticate,
  });

  final bool isAuthenticate;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<SharedPreferences>(
      future: SharedPreferences.getInstance(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        } else if (snapshot.hasError) {
          return const Text('Error loading preferences');
        } else {
          final prefs = snapshot.data!;
          final role = prefs.getString('role');

          final homePage = isAuthenticate
              ? role == 'USER'
                  ? const UserHomeScreen()
                  : role == 'ADMIN'
                      ? const AdminHomeScreen()
                      : const SignInPageScreen()
              : const SignInPageScreen();

          final materialApp = MaterialApp(
            title: 'RampUp App',
            theme: PrimaryTheme.generateTheme(context),
            debugShowCheckedModeBanner: false,
            home: homePage,
          );

          return MultiBlocProvider(
            providers: [
              BlocProvider<AdminHomeScreenBloc>(
                create: (context) => AdminHomeScreenBloc(context),
              ),
              BlocProvider<UserHomeScreenBloc>(
                create: (context) => UserHomeScreenBloc(context),
              ),
              BlocProvider<SignInPageScreenBloc>(
                create: (context) => SignInPageScreenBloc(),
              ),
            ],
            child: materialApp,
          );
        }
      },
    );
  }
}
