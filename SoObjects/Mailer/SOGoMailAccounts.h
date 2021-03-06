/*
  Copyright (C) 2009-2013 Inverse inc.
  Copyright (C) 2004-2005 SKYRIX Software AG

  This file is part of SOGo.

  SOGo is free software; you can redistribute it and/or modify it under
  the terms of the GNU Lesser General Public License as published by the
  Free Software Foundation; either version 2, or (at your option) any
  later version.

  SOGo is distributed in the hope that it will be useful, but WITHOUT ANY
  WARRANTY; without even the implied warranty of MERCHANTABILITY or
  FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
  License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with SOGo; see the file COPYING.  If not, write to the
  Free Software Foundation, 59 Temple Place - Suite 330, Boston, MA
  02111-1307, USA.
*/

#ifndef __Mailer_SOGoMailAccounts_H__
#define __Mailer_SOGoMailAccounts_H__

#import <SOGo/SOGoFolder.h>

/*
  SOGoMailAccounts
    Parent object: SOGoUserFolder
    Child objects: SOGoMailAccount
    
  The SOGoMailAccounts folder contains the mail accounts which are associated
  with a user.
  The list of accounts is currently retrieved from the context -activeUser.

  Note: this is not yet an IMAP4 object. Its a wrapper which contains the root
        IMAP4 objects.
*/

@class NSArray;
@class NSMutableDictionary;

@interface SOGoMailAccounts : SOGoFolder

- (NSArray *) mailAccounts;

- (NSArray *) toManyRelationshipKeys;

@end

#endif /* __Mailer_SOGoMailAccounts_H__ */
